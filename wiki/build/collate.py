# -*- coding: utf-8 -*-
"""歌曲名称排序键（build 阶段使用）。

规则：英文字母 -> 日文罗马音首字母 -> 中文拼音首字母 -> 其他符号按 Unicode。

排序键为元组 (类别, 首字母, 规范化名称, 原始名称)：
  0 英文字母（A-Z，忽略大小写）
  1 日文假名（转罗马音首字母）
  2 汉字（拼音首字母）
  3 其他符号（按 Unicode 码位）

汉字拼音数据来自 build/pinyin_initial.txt.gz（U+4E00..U+9FFF 每码位一字节，
'.' 表示无拼音），构建期读取一次，避免运行时计算。
"""
from __future__ import annotations

import gzip
from pathlib import Path
from typing import Any

_DATA_PATH = Path(__file__).resolve().parent / "pinyin_initial.txt.gz"
_HAN_START = 0x4E00
_HAN_END = 0xA000
_PINYIN: str | None = None

# 假名 -> 罗马音（首字母所需的最小映射）
_KANA = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "o", "ん": "n",
    "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go",
    "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo",
    "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do",
    "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo",
    "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po",
    "ぁ": "a", "ぃ": "i", "ぅ": "u", "ぇ": "e", "ぉ": "o",
    "ゃ": "ya", "ゅ": "yu", "ょ": "yo", "っ": "tsu", "ー": "",
    "ゔ": "bu", "ゐ": "i", "ゑ": "e",
}


def _kana_table() -> dict[str, str]:
    table = dict(_KANA)
    for kana, roma in list(_KANA.items()):
        if "ぁ" <= kana <= "ゖ":
            table[chr(ord(kana) + 0x60)] = roma
    return table


_KANA_TABLE = _kana_table()


def _load_pinyin() -> str:
    global _PINYIN
    if _PINYIN is None:
        with gzip.open(_DATA_PATH, "rt", encoding="ascii") as f:
            _PINYIN = f.read()
    return _PINYIN


def _first_initial(text: str) -> tuple[int, str]:
    """返回 (类别, 首字母)。类别 0=字母 1=假名 2=汉字 3=符号。"""
    ch = text[0]
    if ch.isascii() and ch.isalpha():
        return 0, ch.upper()
    if ch in _KANA_TABLE:
        roma = _KANA_TABLE[ch]
        return 1, (roma[:1].upper() if roma else "")
    code = ord(ch)
    if _HAN_START <= code < _HAN_END:
        letter = _load_pinyin()[code - _HAN_START]
        if letter != ".":
            return 2, letter
    return 3, ""


def _normalize(text: str) -> str:
    return text.casefold()


def song_sort_key(name: Any, latin_title: str = "") -> tuple[int, str, str, str]:
    """生成可直接比较的排序键。"""
    raw = str(name or "")
    if not raw:
        return (3, "", "", "")
    category, initial = _first_initial(raw)
    # 拉丁/罗马音曲目优先使用 latinTitle 作为次级排序（更贴近读音）。
    secondary = _normalize(str(latin_title)) if latin_title else ""
    return (category, initial, secondary, _normalize(raw))
