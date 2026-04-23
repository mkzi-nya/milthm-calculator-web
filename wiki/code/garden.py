#!/usr/bin/env python3
BONUS_RATE = 0.155

crops = {
    '双孢蘑菇': (['菌菇', '食物'], 8, 60, []),
    '水蕨菜': (['食物'], 45, 360, ['菌菇*5']),
    '勿忘草': (['观赏'], 7, 720, []),
    '水晶兰': (['观赏'], 20, 1920, ['观赏*5']),
    '蓝莓': (['食物'], 300, 5760, ['观赏*5']),
    '草菇': (['菌菇', '食物'], 18, 60, ['菌菇*5']),
    '卡宴辣椒': (['功能'], 3, 360, ['食物*10']),
    '铃兰': (['观赏'], 10, 720, ['功能*1']),
    '大柱霉草': (['观赏'], 23, 1920, ['功能*3']),
    '草莓': (['食物'], 400, 5760, ['功能*3']),
    '香菇': (['菌菇', '食物'], 45, 60, ['食物*30']),
    '傅氏凤尾蕨': (['观赏', '食物'], 5, 360, ['食物*25']),
}

fixed_provider_crop = {
    '菌菇': '双孢蘑菇',
    '观赏': '勿忘草',
    '食物': '双孢蘑菇',
    '功能': '卡宴辣椒',
}


def growth_hours(crop_name):
    return crops[crop_name][2] / 60


def cost_items(crop_name):
    return [(category, float(amount)) for item in crops[crop_name][3] for category, amount in [item.split('*')]]


def profit_rate(crop_name, category_rates, bonus_rate):
    base_harvest = crops[crop_name][1] * (1 + bonus_rate)
    total_hours = growth_hours(crop_name) + sum(amount / category_rates[category] for category, amount in cost_items(crop_name))
    return base_harvest / total_hours


def solve_fixed_category_rates(bonus_rate):
    category_rates = {}
    unresolved = fixed_provider_crop.copy()
    while unresolved:
        for category, crop_name in list(unresolved.items()):
            if all(cost_category in category_rates for cost_category, _ in cost_items(crop_name)):
                category_rates[category] = profit_rate(crop_name, category_rates, bonus_rate)
                del unresolved[category]
    return category_rates


def solve_best_category_rates(bonus_rate):
    all_categories = sorted({category for crop in crops.values() for category in crop[0]})
    category_rates = {
        category: max(base_harvest * (1 + bonus_rate) / (growth_time / 60) for types, base_harvest, growth_time, _ in crops.values() if category in types)
        for category in all_categories
    }

    for _ in range(9999):
        crop_rates = {crop_name: profit_rate(crop_name, category_rates, bonus_rate) for crop_name in crops}
        next_category_rates = {
            category: max(crop_rates[crop_name] for crop_name, crop in crops.items() if category in crop[0])
            for category in all_categories
        }
        if max(abs(next_category_rates[category] - category_rates[category]) for category in all_categories) < 1e-12:
            return next_category_rates
        category_rates = next_category_rates


def format_number(value):
    return f'{value:.2f}'.rstrip('0').rstrip('.')


fixed_net_rates = solve_fixed_category_rates(0)
fixed_avg_rates = solve_fixed_category_rates(BONUS_RATE)
best_net_rates = solve_best_category_rates(0)
best_avg_rates = solve_best_category_rates(BONUS_RATE)

table_rows = [
    f'| {crop_name} | {format_number(profit_rate(crop_name, fixed_net_rates, 0))}({format_number(profit_rate(crop_name, fixed_avg_rates, BONUS_RATE))})/h | '
    f'{format_number(profit_rate(crop_name, best_net_rates, 0))}({format_number(profit_rate(crop_name, best_avg_rates, BONUS_RATE))})/h |'
    for crop_name in crops
]

open('./1.md', 'w', encoding='utf-8').write('\n'.join([
    '| 作物 | 净收益 | 最高收益 |',
    '|-|-|-|',
    *table_rows,
]))
