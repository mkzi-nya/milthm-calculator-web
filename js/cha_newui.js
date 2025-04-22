console.log("Updated at 2025.04.19")
console.log(" ███  ███                               \n\
 ███  ███                               \n\
 ███▒▒███                               \n\
 ███▓▓███   ░████░    ░████░            \n\
 ██▓██▓██  ░██████░  ░██████░           \n\
 ██▒██▒██  ███  ███  ███  ███  ▒███▒  █ \n\
 ██░██░██  ██░  ░██  ██░  ░██  ████████ \n\
 ██ ██ ██  ██    ██  ██    ██  ▓  ▒███▒ \n\
 ██    ██  ██░  ░██  ██░  ░██           \n\
 ██    ██  ███  ███  ███  ███           \n\
 ██    ██  ░██████░  ░██████░           \n\
 ██    ██   ░████░    ░████░      ")
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
});

const constants = {
  "5aaafcea-684f-4310-936d-67ae35956c48": { constant: -1, category: "Ø", name: "驟雨の狭間", ad: 4.334, ae: 1, af: 1, ag: 1 },
  "1104f25d-2493-4bc7-9172-b262d36488ac": { constant: -1, category: "SP", name: "Oiiaioooooiai", ad: 0,ae: 3.5, af: 4, ag: 0 },
  "e543f4a5-5f55-45e5-9c41-ebe1c155c12e": { constant: -1, category: "SP", name: "Dogbite", ae: 3, af: 3,ad: 0, ag: 2.5 },
  "6252f7c4-8eae-4b59-a22f-9f142f904029": { constant: 12.3, category: "CL", name: "Contrasty Angeles", yct: 2, ad: 2.438, ae: 4.5, af: 3.5, ag: 1 },
  "d742e989-92c4-4474-87ef-57b218d0fc41": { constant: 12.2, category: "CL", name: "命日", yct: 246, ad: 4.66, ae: 2.5, af: 3.5, ag: 1 },
  "9acd5289-bc81-49fb-afc8-7b0631e60e60": { constant: 12.1, category: "CL", name: "Regnaissance", yct: 234, ad: 4.169, ae: 5, af: 4.5, ag: 1 },
  "a19a54b6-363e-49ae-9cd2-633a2db8ae4f": { constant: 11.9, category: "CL", name: "Broken Conviction", yct: 215, ad: 2.35, ag: 4, ae: 1, af: 1 },
  "eab07c23-395d-47f3-be33-15c7c566f694": { constant: 11.7, category: "CL", name: "Moonflutter", yct: 219, ad: 2.232, ae: 3, af: 3, ag: 3.5 },
  "ead657f6-f0f2-4a21-acfd-4322892a0562": { constant: 11.7, category: "CL", name: "Fly To Meteor feat.兔柒", yct: 215, ad: 3.583, ae: 3.5, af: 3.5, ag: 0 },
  "217898b1-4806-401f-adf5-740e9d72b66e": { constant: 10.5, category: "CL", name: "雨女", yct: 203, ad: 1.192, ae: 2, af: 1.5, ag: 0 },
  "cc75ce1c-dbed-4bc7-94eb-728bf36bb1ec": { constant: 12.1, category: "CB", name: "Innocent white", yct: 240, ad: 3.121, ae: 4.5, af: 4, ag: 0 },
  "97ef94ce-df45-4a92-9645-2456f606e0fa": { constant: 11.9, category: "CB", name: "Meltovt Necrosys", yct: 211, ad: 0, ae: 1, af: 1, ag: 0 },
  "ed40cd1b-2741-415a-be81-6fcc63db4044": { constant: 11.7, category: "CB", name: "HYPER MEMORIES", yct: 256, ad: 4.137, ae: 1.5, af: 2, ag: 0 },
  "ef55520f-c913-449f-bf26-ab947384127e": { constant: 11.5, category: "CB", name: "Broken Conviction", yct: 220, ad: 2.986, af: 1, ae: 1, ag: 0 },
  "269efa5f-8b69-4a71-be24-7abe57372b3f": { constant: 11.5, category: "CB", name: "Contrasty Angeles", yct: 217, ad: 3.568, ae: 3, af: 3.5, ag: 0 },
  "e0162d0e-0727-49c2-80fa-f611621650ea": { constant: 11.4, category: "CB", name: "slic.hertz #GdbG", yct: 240, ae: 2.5, af: 3.5, ad: 0, ag: 0 },
  "61f5e310-d45b-40dc-a934-e3a849382729": { constant: 11.4, category: "CB", name: "Moonflutter", yct: 211, ad: 2.838, ae: 3, af: 2.5, ag: 0 },
  "14080c32-a16c-464c-b24a-880f1a7e657d": { constant: 11.4, category: "CB", name: "Algebra", yct: 220, ad: 2.945, ae: 4, af: 3.5, ag: 0 },
  "6b478cca-035d-4297-b34a-ae75658d81bd": { constant: 11.3, category: "CB", name: "Fragment of Memories", yct: 211, ad: 2.719, ae: 3, af: 3, ag: 0 },
  "f425914c-db82-413c-aca9-96ff151b8605": { constant: 11.2, category: "CB", name: "IN", yct: 225, ad: 2.745, ae: 1, af: 1, ag: 0 },
  "da07cabf-7c7b-4083-a41a-879be13c8c94": { constant: 11.2, category: "CB", name: "イコラト", yct: 219, ad: 2.484, ae: 3.5, af: 2, ag: 0 },
  "01929c36-e7ba-40d5-8123-ca3d4c2da4fb": { constant: 11.2, category: "CB", name: "参宿四~Betelgeuse~", yct: 217, ad: 2.013, ae: 2, af: 3, ag: 0 },
  "04d821ff-493a-421d-83a5-a61a59b2d3d3": { constant: 11.1, category: "CB", name: "命日", yct: 211, ad: 3.118, ae: 2.5, af: 2, ag: 0 },
  "80df6e22-69c3-4983-a712-adeebb47fb2b": { constant: 11.1, category: "CB", name: "Regnaissance", yct: 227, ad: 2.86, ae: 3.5, af: 4, ag: 0 },
  "22bd5632-25cc-412f-9299-bcf2cdd64aed": { constant: 10.9, category: "CB", name: "樱落繁花", yct: 205, ad: 2.789, ae: 4, af: 3, ag: 0 },
  "f7b864bc-72a3-4c9d-ab7c-b57946fb77ec": { constant: 10.8, category: "CB", name: "Elsorhg", yct: 204, ad: 0, ae: 1, af: 1, ag: 0 },
  "aafec4af-3479-445b-9b30-b6822b9f5e19": { constant: 10.8, category: "CB", name: "Moving on", yct: 206, ae: 1.5, af: 1.5, ad: 0, ag: 0 },
  "a6ef2d0a-057b-4ada-be88-23dcde06ada5": { constant: 10.7, category: "CB", name: "Hikari", yct: 193, ad: 2.44, ae: 1, af: 1.5, ag: 0 },
  "6db4cb9b-adec-4ce5-bb0a-71d4761e88f8": { constant: 10.6, category: "CB", name: "WATER", yct: 206, ad: 1.624, ae: 1.5, af: 2.5, ag: 0 },
  "13fda58e-3091-4b3d-8eb9-4ac8346ce61a": { constant: 10.6, category: "CB", name: "Threat - Sky Islands", yct: 199, ae: 5, af: 4.5, ad: 0, ag: 0 },
  "35ab3fba-928d-4b08-be7f-2fc67a77a838": { constant: 10.5, category: "CB", name: "Fly To Meteor (Milthm Edit)", yct: 191, ad: 3.183, ae: 2.5, af: 2, ag: 0 },
  "7131ad7b-1602-4acd-bfc1-1ff712d054f0": { constant: 10.5, category: "CB", name: "Future Unbound (Game Edit)", yct: 200, ad: 1.556, ae: 2, af: 2.5, ag: 0 },
  "7c0cdf77-fcfa-4f96-9897-24ca10582c32": { constant: 10.3, category: "CB", name: "Threat - Superstructure", yct: 199, ad: 0, ae: 1, af: 1, ag: 0 },
  "7cdb8a2c-e133-4a91-a29f-4e21ba4e442a": { constant: 10.3, category: "CB", name: "Dogbite", yct: 203, ad: 0, ae: 1, af: 1, ag: 0 },
  "3a908e2d-8a39-4220-a6b8-4817bd1cea4a": { constant: 10.2, category: "CB", name: "cybernetic blazar", yct: 205, ad: 0, ae: 1, af: 1, ag: 0 },
  "b60f0788-f9af-4a41-8c73-2b72151d309f": { constant: 10.2, category: "CB", name: "Agnostic", yct: 206, ad: 0, ae: 1, af: 1, ag: 0 },
  "887157ea-fe1a-480b-b7e9-e6a4f9e27ae4": { constant: 10.1, category: "CB", name: "夜風", yct: 194, ad: 0, ae: 1, af: 1, ag: 0 },
  "130d1d7d-ba20-467c-b5f5-eafc51882809": { constant: 10.1, category: "CB", name: "☹", yct: 191, ad: 0, ae: 1, af: 1, ag: 0 },
  "c902851b-fa01-44f4-97a8-ab6d317fccd4": { constant: 10.0, category: "CB", name: "仮想明日", yct: 208, ad: 0, ae: 1, af: 1, ag: 0 },
  "03b883cf-f28b-4e33-8f67-d3bcb1a74719": { constant: 10.0, category: "CB", name: "Psyched Fevereiro", yct: 196, ad: 0, ae: 1, af: 1, ag: 0 },
  "fc40c7fc-e62a-4fa8-891e-430444191e26": { constant: 10.0, category: "CB", name: "OverRain", yct: 195, ad: 0, ae: 1, af: 1, ag: 0 },
  "8d787646-a290-4f14-a831-d7d43bc9f534": { constant: 9.8, category: "CB", name: "Rainbow Flavor!", yct: 185, ad: 0, ae: 1, af: 1, ag: 0 },
  "f728706a-e40a-421d-aaba-dde4bc35e8e3": { constant: 9.8, category: "CB", name: "Oniichan", yct: 172, ad: 0, ae: 1, af: 1, ag: 0 },
  "fa97e341-3a72-47bc-927e-b9cf87980b37": { constant: 9.7, category: "CB", name: "ネオン色のまち feat.Mai", yct: 188, ad: 0, ae: 1, af: 1, ag: 0 },
  "9e083951-188f-4998-951a-58d08b4b4f45": { constant: 9.7, category: "CB", name: "Jump out?", yct: 180, ad: 0, ae: 1, af: 1, ag: 0 },
  "00e3e0b6-fbdd-4a7d-bcab-ba6540f4225d": { constant: 9.6, category: "CB", name: "白虎蓮華", yct: 189, ad: 0, ae: 1, af: 1, ag: 0 },
  "df4ff6fe-a8da-4b63-b0bd-b69ac8d80ace": { constant: 9.6, category: "CB", name: "Bio-Engineering", yct: 176, ad: 0, ae: 1, af: 1, ag: 0 },
  "9a55b865-0860-41b9-9f78-bc5209bc9f44": { constant: 9.5, category: "CB", name: "雨女", yct: 179, ad: 0, ae: 1, af: 1, ag: 0 },
  "ca4c79a7-709a-40c5-b0e0-c04b6deff431": { constant: 9.4, category: "CB", name: "烁雨", yct: 178, ad: 0, ae: 1, af: 1, ag: 0 },
  "c3769378-d595-4119-b93c-e0db2b3ea8e2": { constant: 9.3, category: "CB", name: "Aconsma", yct: 175, ad: 0, ae: 1, af: 1, ag: 0 },
  "cdacaee4-2866-4109-93a8-5bbbf0dc6207": { constant: 9.3, category: "CB", name: "花月", yct: 181, ad: 0, ae: 1, af: 1, ag: 0 },
  "d70bc3b4-752a-45b9-bd31-c6ab8b9a7c9e": { constant: 9.2, category: "CB", name: "INFP.mp3", yct: 176, ad: 0, ae: 1, af: 1, ag: 0 },
  "725abac1-5de5-463f-870d-a99a41cae61e": { constant: 9.1, category: "CB", name: "暮予星光", yct: 180, ad: 1.968, ae: 1, af: 1, ag: 0 },
  "bb5b7628-87b1-4e1c-8e07-8bacadf6f2b1": { constant: 8.6, category: "CB", name: "サイクルの欠片", yct: 154, ad: 0, ae: 1, af: 1, ag: 0 },
  "b2594118-dcf5-4750-9e57-e4eeef6142fe": { constant: 8.5, category: "CB", name: "时落之雨", yct: 160, ad: 0, ae: 1, af: 1, ag: 0 },
  "6df0b462-dded-46db-8505-3ff86fc46c26": { constant: 8.3, category: "CB", name: "粗线条的雨", yct: 153, ad: 0, ae: 1, af: 1, ag: 0 },
  "35b424f8-d0de-41ab-9512-f365a154c328": { constant: 8.3, category: "CB", name: "Words", yct: 160, ad: 0, ae: 1, af: 1, ag: 0 },
  "858f698c-4bd9-40f0-aa8b-793021e0c550": { constant: 7.5, category: "CB", name: "雨之城", yct: 134, ad: 0, ae: 1, af: 1, ag: 0 },
  "c18f27b6-2d4e-4631-82b1-4ede237874df": { constant: 9.0, category: "SK", name: "Contrasty Angeles", yct: 179, ad: 0, ae: 1, af: 1, ag: 0 },
  "0785d07e-50e1-4e3f-b1aa-01fa43d0c2f6": { constant: 8.9, category: "SK", name: "HYPER MEMORIES", yct: 169, ad: 0, ae: 1, af: 1, ag: 0 },
  "c9a9bc45-8695-4fb9-babe-d2027a6d9ed7": { constant: 8.8, category: "SK", name: "樱落繁花", yct: 164, ad: 0, ae: 1, af: 1, ag: 0 },
  "2cfa74ee-7e6d-4ebf-8f0a-e7cfb3a7e94c": { constant: 8.7, category: "SK", name: "イコラト", yct: 157, ad: 0, ae: 1, af: 1, ag: 0 },
  "63b8512d-ac16-4026-bfee-1317d860ab82": { constant: 8.7, category: "SK", name: "命日", yct: 156, ad: 0, ae: 1, af: 1, ag: 0 },
  "de2327c7-0d63-496f-9974-dbb70bfcbed8": { constant: 8.6, category: "SK", name: "Broken Conviction", yct: 154, ad: 0, ae: 1, af: 1, ag: 0 },
  "a5a9a7e4-3030-4bb3-9eef-04e58a0fbdb4": { constant: 8.5, category: "SK", name: "Regnaissance", yct: 154, ad: 0, ae: 1, af: 1, ag: 0 },
  "2022fd8f-3210-4151-8636-8ec888236214": { constant: 8.4, category: "SK", name: "Hikari", yct: 135, ad: 0, ae: 1, af: 1, ag: 0 },
  "de74f367-3a91-4421-a657-f0e8268083a3": { constant: 8.4, category: "SK", name: "Fragment of Memories", yct: 154, ad: 0, ae: 1, af: 1, ag: 0 },
  "9953c1b3-f92a-406c-8ea6-78dbee1b8f71": { constant: 8.3, category: "SK", name: "Bio-Engineering", yct: 167, ad: 0, ae: 1, af: 1, ag: 0 },
  "d6514d67-18d3-4d8e-8492-890061efb6f7": { constant: 8.2, category: "SK", name: "花月", yct: 163, ad: 0, ae: 1, af: 1, ag: 0 },
  "14700dda-b3c7-429d-a5ce-8a65f2fe4846": { constant: 8.2, category: "SK", name: "Innocent white", yct: 160, ad: 0, ae: 1, af: 1, ag: 0 },
  "962ec79e-489c-43ea-bd72-6dc3448e3983": { constant: 8.1, category: "SK", name: "Algebra", yct: 153, ad: 0, ae: 1, af: 1, ag: 0 },
  "d89765a7-05a1-44a1-8ed3-f23f5f15741a": { constant: 8.0, category: "SK", name: "☹", yct: 151, ad: 0, ae: 1, af: 1, ag: 0 },
  "4001a2b3-374d-438e-8e2b-2bd6d3651805": { constant: 8.0, category: "SK", name: "ネオン色のまち feat.Mai", yct: 157, ad: 0, ae: 1, af: 1, ag: 0 },
  "44405d3d-4162-4fb8-9e86-fc7c965d4d2d": { constant: 8.0, category: "SK", name: "Oniichan", yct: 169, ad: 0, ae: 1, af: 1, ag: 0 },
  "e663eb53-66d4-4a76-b533-445ef08ee18e": { constant: 7.9, category: "SK", name: "IN", yct: 142, ad: 0, ae: 1, af: 1, ag: 0 },
  "38b25a54-afa9-4369-b286-90ba2e29df0b": { constant: 7.9, category: "SK", name: "Jump out?", yct: 131, ad: 0, ae: 1, af: 1, ag: 0 },
  "dae03da2-2ff0-4ed1-9624-945c2b9d3118": { constant: 7.9, category: "SK", name: "Moonflutter", yct: 135, ad: 0, ae: 1, af: 1, ag: 0 },
  "e7ec6340-be44-44ab-8545-d5b7cf326fd4": { constant: 7.8, category: "SK", name: "Meltovt Necrosys", yct: 132, ad: 0, ae: 1, af: 1, ag: 0 },
  "e75e2d80-86a0-464f-8d29-8dd0bb68328b": { constant: 7.8, category: "SK", name: "サイクルの欠片", yct: 134, ad: 0, ae: 1, af: 1, ag: 0 },
  "b1361177-1426-47cc-b036-afd09cad775b": { constant: 7.8, category: "SK", name: "cybernetic blazar", yct: 147, ad: 0, ae: 1, af: 1, ag: 0 },
  "fccd5960-dbdc-4127-8b0b-58c1fb521354": { constant: 7.6, category: "SK", name: "OverRain", yct: 144, ad: 0, ae: 1, af: 1, ag: 0 },
  "26a76638-ec89-4809-bd40-5d6afe403c40": { constant: 7.6, category: "SK", name: "slic.hertz #GdbG", yct: 140, ad: 0, ae: 1, af: 1, ag: 0 },
  "640cea92-0024-4ba5-aa16-8a38f77743ac": { constant: 7.5, category: "SK", name: "Elsorhg", yct: 131, ad: 0, ae: 1, af: 1, ag: 0 },
  "ac9308f8-b896-43af-879a-b65bcfcaa874": { constant: 7.5, category: "SK", name: "Rainbow Flavor!", yct: 132, ad: 0, ae: 1, af: 1, ag: 0 },
  "bdf2975e-8b19-4af8-9b1c-dc6f62587e7c": { constant: 7.5, category: "SK", name: "暮予星光", yct: 138, ad: 0, ae: 1, af: 1, ag: 0 },
  "3442183b-cf7d-4842-9ddf-04243914916a": { constant: 7.5, category: "SK", name: "Future Unbound (Game Edit)", yct: 148, ad: 0, ae: 1, af: 1, ag: 0 },
  "9a75cbb5-f9ad-4557-b3ed-5553a16023d7": { constant: 7.4, category: "SK", name: "Agnostic", yct: 146, ad: 0, ae: 1, af: 1, ag: 0 },
  "fe111534-c651-4896-9538-2dd100131a7d": { constant: 7.3, category: "SK", name: "夜風", yct: 140, ad: 0, ae: 1, af: 1, ag: 0 },
  "b87796c3-a64e-4cfd-a57f-a35484a951e2": { constant: 7.3, category: "SK", name: "WATER", yct: 148, ad: 0, ae: 1, af: 1, ag: 0 },
  "9a8d5198-664a-418a-868b-b28d992c9b9e": { constant: 7.3, category: "SK", name: "Psyched Fevereiro", yct: 139, ad: 0, ae: 1, af: 1, ag: 0 },
  "9476c969-d02d-40ca-b64f-eb3efae43ee7": { constant: 7.0, category: "SK", name: "烁雨", yct: 144, ad: 0, ae: 1, af: 1, ag: 0 },
  "eb7a9055-b56f-46ba-9c30-0f9380d2f5b5": { constant: 6.9, category: "SK", name: "Threat - Sky Islands", yct: 118, ad: 0, ae: 1, af: 1, ag: 0 },
  "1ec80826-e11e-43af-acd3-c154212443b9": { constant: 6.6, category: "SK", name: "仮想明日", yct: 115, ad: 0, ae: 1, af: 1, ag: 0 },
  "9953eae4-4f60-4cfe-a8c3-9ada13a4b1ca": { constant: 6.5, category: "SK", name: "雨女", yct: 117, ad: 0, ae: 1, af: 1, ag: 0 },
  "508fff6a-32dc-4f6b-88c7-bbd86e639085": { constant: 6.5, category: "SK", name: "Fly To Meteor (Milthm Edit)", yct: 128, ad: 0, ae: 1, af: 1, ag: 0 },
  "296e3be3-1bdc-4568-a9d2-33ce9e0da9d4": { constant: 6.5, category: "SK", name: "Words", yct: 122, ad: 0, ae: 1, af: 1, ag: 0 },
  "5aac139b-ab96-486d-a081-6bfebe382932": { constant: 6.5, category: "SK", name: "Dogbite", yct: 117, ad: 0, ae: 1, af: 1, ag: 0 },
  "f28a654d-a2c4-4ff2-88f0-592ba52cd4fd": { constant: 6.5, category: "SK", name: "白虎蓮華", yct: 128, ad: 0, ae: 1, af: 1, ag: 0 },
  "81daeec2-c1ae-4218-97fa-f9796504dba9": { constant: 6.4, category: "SK", name: "参宿四~Betelgeuse~", yct: 120, ad: 0, ae: 1, af: 1, ag: 0 },
  "7d5df9f6-080f-4da0-974a-d2b8cb86e7e6": { constant: 6.3, category: "SK", name: "Moving on", yct: 121, ad: 0, ae: 1, af: 1, ag: 0 },
  "8f75c6ff-a5ac-4738-b5e9-2549fa838084": { constant: 6.0, category: "SK", name: "Aconsma", yct: 124, ad: 0, ae: 1, af: 1, ag: 0 },
  "8e72dab7-e72f-4842-a499-559659279e2c": { constant: 5.5, category: "SK", name: "Threat - Superstructure", yct: 107, ad: 0, ae: 1, af: 1, ag: 0 },
  "37a9f1a0-32d4-4f78-acae-1be9ca7ea42f": { constant: 5.5, category: "SK", name: "INFP.mp3", yct: 96, ad: 0, ae: 1, af: 1, ag: 0 },
  "54ea2f8f-ae05-4aba-a117-8d187bf08074": { constant: 4.5, category: "SK", name: "时落之雨", yct: 84, ad: 0, ae: 1, af: 1, ag: 0 },
  "62c1cdc7-57c2-4a5f-809b-bcfb6c6a0469": { constant: 4.0, category: "SK", name: "粗线条的雨", yct: 73, ad: 0, ae: 1, af: 1, ag: 0 },
  "acdab435-5aa3-45de-a815-9dbb7cd13130": { constant: 4.0, category: "SK", name: "雨之城", yct: 84, ad: 0, ae: 1, af: 1, ag: 0 },
  "7c30226f-0ea5-4b71-aab7-7fefca1070dd": { constant: 4.5, category: "SK", name: "Broken Conviction", yct: 82, ad: 0, ae: 1, af: 1, ag: 0 },
  "4144b702-77bd-4ff4-9ba0-aa7c70b2bab5": { constant: 4.5, category: "DZ", name: "Regnaissance", yct: 80, ad: 0, ae: 1, af: 1, ag: 0 },
  "ac138fef-ad0b-4d0d-883c-453e6fe11d37": { constant: 4.0, category: "DZ", name: "Contrasty Angeles", yct: 79, ad: 0, ae: 1, af: 1, ag: 0 },
  "cea79b8c-23fd-4fbd-b2a9-6f080ef15b44": { constant: 4.0, category: "DZ", name: "cybernetic blazar", yct: 79, ad: 0, ae: 1, af: 1, ag: 0 },
  "2d6e3256-818b-434e-9980-ee6fcf14a8c7": { constant: 4.0, category: "DZ", name: "☹", yct: 77, ad: 0, ae: 1, af: 1, ag: 0 },
  "5d23aa36-a3df-406f-980f-b6cd0cec5385": { constant: 3.5, category: "DZ", name: "仮想明日", yct: 63, ad: 0, ae: 1, af: 1, ag: 0 },
  "2484331f-4345-4f97-98ac-edda4be3f723": { constant: 3.5, category: "DZ", name: "Psyched Fevereiro", yct: 59, ad: 0, ae: 1, af: 1, ag: 0 },
  "5ab2ddde-5f3e-42ec-b626-1296680093d1": { constant: 3.5, category: "DZ", name: "ネオン色のまち feat.Mai", yct: 64, ad: 0, ae: 1, af: 1, ag: 0 },
  "375f0d93-82e2-4350-9b46-98c3dd836305": { constant: 3.0, category: "DZ", name: "雨女", yct: 55, ad: 0, ae: 1, af: 1, ag: 0 },
  "a8f6451b-eeb3-4cb4-898b-4a8c4233567f": { constant: 3.0, category: "DZ", name: "Oniichan", yct: 65, ad: 0, ae: 1, af: 1, ag: 0 },
  "794c0460-7a5e-4ffb-bfcc-2800f1d5bfb2": { constant: 3.0, category: "DZ", name: "Moonflutter", yct: 58, ad: 0, ae: 1, af: 1, ag: 0 },
  "520361a1-805b-4332-b53e-1da11a94de1b": { constant: 3.0, category: "DZ", name: "イコラト", yct: 57, ad: 0, ae: 1, af: 1, ag: 0 },
  "dd163ba4-a1fa-4fc7-ba45-91561c824cc8": { constant: 3.0, category: "DZ", name: "命日", yct: 52, ad: 0, ae: 1, af: 1, ag: 0 },
  "74bf4e17-c246-4871-9b2b-0dd0d0e6ee28": { constant: 3.0, category: "DZ", name: "Agnostic", yct: 56, ad: 0, ae: 1, af: 1, ag: 0 },
  "d83fd3e1-a609-4b73-b1f1-348ee1dca71d": { constant: 3.0, category: "DZ", name: "夜風", yct: 60, ad: 0, ae: 1, af: 1, ag: 0 },
  "8442e9aa-ea0a-4d9e-8592-cfd9228eb14c": { constant: 3.0, category: "DZ", name: "樱落繁花", yct: 67, ad: 0, ae: 1, af: 1, ag: 0 },
  "1ab3b5cf-b6af-48ec-99e8-2d3a4e9edc72": { constant: 3.0, category: "DZ", name: "Hikari", yct: 65, ad: 0, ae: 1, af: 1, ag: 0 },
  "c6629820-510f-4575-969e-dc6a9d3fe479": { constant: 3.0, category: "DZ", name: "WATER", yct: 60, ad: 0, ae: 1, af: 1, ag: 0 },
  "adcc6c11-2986-4f3c-ae7e-4b52fe75dc83": { constant: 3.0, category: "DZ", name: "Fly To Meteor (Milthm Edit)", yct: 61, ad: 0, ae: 1, af: 1, ag: 0 },
  "75fbb0ef-08fa-47cb-8c6f-acf361f7a081": { constant: 3.0, category: "DZ", name: "Future Unbound (Game Edit)", yct: 64, ad: 0, ae: 1, af: 1, ag: 0 },
  "d8074d7e-dc36-4190-9377-0c62c3775dac": { constant: 3.0, category: "DZ", name: "Dogbite", yct: 64, ad: 0, ae: 1, af: 1, ag: 0 },
  "cfa1c1fd-432e-4313-ae23-fbd6f731ae46": { constant: 3.0, category: "DZ", name: "白虎蓮華", yct: 66, ad: 0, ae: 1, af: 1, ag: 0 },
  "6eac0020-b9a1-480e-9539-633c0e502f9c": { constant: 3.0, category: "DZ", name: "slic.hertz #GdbG", yct: 60, ad: 0, ae: 1, af: 1, ag: 0 },
  "e27a66da-19c5-4d3a-85f4-5defdf5b7b88": { constant: 2.0, category: "DZ", name: "Elsorhg", yct: 33, ad: 0, ae: 1, af: 1, ag: 0 },
  "c55ac81b-f00d-4031-8f54-a7735ce84cd3": { constant: 2.0, category: "DZ", name: "Meltovt Necrosys", yct: 49, ad: 0, ae: 1, af: 1, ag: 0 },
  "5b104c2e-94ad-4156-ab25-d1b11be487f3": { constant: 2.0, category: "DZ", name: "Rainbow Flavor!", yct: 25, ad: 0, ae: 1, af: 1, ag: 0 },
  "0af38afb-fe05-403c-90b6-2876bb18616e": { constant: 2.0, category: "DZ", name: "Threat - Sky Islands", yct: 47, ad: 0, ae: 1, af: 1, ag: 0 },
  "6d4c9a21-2ed4-4892-9b38-fd53840de04f": { constant: 2.0, category: "DZ", name: "Moving on", yct: 40, ad: 0, ae: 1, af: 1, ag: 0 },
  "e09a8896-ad87-4cee-8f2a-40b8d4439f26": { constant: 2.0, category: "DZ", name: "Algebra", yct: 46, ad: 0, ae: 1, af: 1, ag: 0 },
  "a5000e56-b917-40ce-9ebb-12cc2c4a2e70": { constant: 2.0, category: "DZ", name: "Fragment of Memories", yct: 49, ad: 0, ae: 1, af: 1, ag: 0 },
  "98913dff-7257-44aa-a0f2-abcd58d11fcd": { constant: 2.0, category: "DZ", name: "Threat - Superstructure", yct: 40, ad: 0, ae: 1, af: 1, ag: 0 },
  "c5032ab4-c03c-42c3-b132-445b94165e8d": { constant: 2.0, category: "DZ", name: "OverRain", yct: 43, ad: 0, ae: 1, af: 1, ag: 0 },
  "b75e195e-7991-4e4a-8afc-7372b4ae95fd": { constant: 2.0, category: "DZ", name: "暮予星光", yct: 41, ad: 0, ae: 1, af: 1, ag: 0 },
  "a4ac4167-5934-4157-90e7-675c994b4451": { constant: 2.0, category: "DZ", name: "参宿四~Betelgeuse~", yct: 32, ad: 0, ae: 1, af: 1, ag: 0 },
  "eceaaf9e-3754-4054-9c17-2d87644de96e": { constant: 2.0, category: "DZ", name: "烁雨", yct: 40, ad: 0, ae: 1, af: 1, ag: 0 },
  "8c794275-de29-4beb-87a1-af024fe94e1e": { constant: 2.0, category: "DZ", name: "花月", yct: 83, ad: 0, ae: 1, af: 1, ag: 0 },
  "3ebe1bbe-5d13-4175-ad91-dcf85c7bfd19": { constant: 2.0, category: "DZ", name: "INFP.mp3", yct: 40, ad: 0, ae: 1, af: 1, ag: 0 },
  "7072a099-a482-484d-84a5-945ac94807e1": { constant: 2.0, category: "DZ", name: "Innocent white", yct: 36, ad: 0, ae: 1, af: 1, ag: 0 },
  "9884d239-3007-4e78-a655-297f000bcf50": { constant: 2.0, category: "DZ", name: "Words", yct: 34, ad: 0, ae: 1, af: 1, ag: 0 },
  "213a40e1-d945-464c-aa6e-9ae82db8fc50": { constant: 2.0, category: "DZ", name: "Jump out?", yct: 37, ad: 0, ae: 1, af: 1, ag: 0 },
  "a5ba0b3b-1eb5-4b43-8d12-9e82b6d0afaa": { constant: 2.0, category: "DZ", name: "Bio-Engineering", yct: 33, ad: 0, ae: 1, af: 1, ag: 0 },
  "e7cd8b7f-a19c-488d-b9b6-127524586ed3": { constant: 1.0, category: "DZ", name: "IN", yct: 46, ad: 0, ae: 1, af: 1, ag: 0 },
  "8b329704-9ce5-4361-abd5-b89c68b61286": { constant: 1.0, category: "DZ", name: "Aconsma", yct: 16, ad: 0, ae: 1, af: 1, ag: 0 },
  "68fbf0eb-f43a-4497-afb1-8282176aed97": { constant: 1.0, category: "DZ", name: "HYPER MEMORIES", yct: 63, ad: 0, ae: 1, af: 1, ag: 0 },
  "64cc8f3b-7bed-48a3-80ca-f281c57c0916": { constant: 1.0, category: "DZ", name: "时落之雨", yct: 17, ad: 0, ae: 1, af: 1, ag: 0 },
  "7687d948-dbe1-48c4-a786-fbe669ec7b0c": { constant: 1.0, category: "DZ", name: "粗线条的雨", yct: 13, ad: 0, ae: 1, af: 1, ag: 0 },
  "e69b4e77-ccb2-4694-ba88-7209ed097783": { constant: 1.0, category: "DZ", name: "雨之城", yct: 26, ad: 0, ae: 1, af: 1, ag: 0 },
  "606be389-ad01-41e3-a1ba-e7b355d16948": { constant: 1.0, category: "DZ", name: "Sundown", yct: 14, ad: 0, ae: 1, af: 1, ag: 0 },
  "364be32e-f685-4efb-80b5-64281c93939d": { constant: 1.0, category: "DZ", name: "Welcome to Milthm", yct: 11, ad: 0, ae: 1, af: 1, ag: 0 },
  "4fa17ebf-6a8e-47c1-8d8b-bd1344ccd559": { constant: 1.0, category: "DZ", name: "サイクルの欠片", yct: 20, ad: 0, ae: 1, af: 1, ag: 0 },
  "6a647130-01de-4cf2-ba7a-a6065f043465": { constant: 4.0, category: "SK", name: "White Lizard", yct: 83, ad: 0, ae: 1, af: 1, ag: 0 },
  "c1d143f6-ad6b-46cc-b3e0-f136e4accb01": { constant: 10.6, category: "CB", name: "Threat - Waterfront Complex", yct: 34, ad: 0, ae: 1, af: 1, ag: 0 },
  "9c28aeec-247e-4b9d-9edc-a92d0bd06303": { constant: 7.6, category: "SK", name: "Threat - Waterfront Complex", yct: 131, ad: 0, ae: 1, af: 1, ag: 0 },
  "2103d16c-9a07-4001-be01-155ef305118e": { constant: 2.0, category: "DZ", name: "Threat - Waterfront Complex", yct: 198, ad: 0, ae: 1, af: 1, ag: 0 },
  "1a3167ae-9105-4545-9aa7-3cab60874e9c": { constant: 10.4, category: "CB", name: "Kayava", yct: 205, ad: 0, ae: 1, af: 1, ag: 0 },
  "1ae6231b-d165-4f09-a138-9ec0d29431a7": { constant: 5.5, category: "SK", name: "Kayava", yct: 101, ad: 0, ae: 1, af: 1, ag: 0 },
  "85a6566f-d9df-408e-a812-0b13a80362cc": { constant: 3.0, category: "DZ", name: "Kayava", yct: 60, ad: 0, ae: 1, af: 1, ag: 0 },
  "abefe6c9-2b30-45ef-b5b0-8edb5fc18195": { constant: 11.5, category: "CB", name: "Threat - Metropolis", yct: 211, ad: 0, ae: 1, af: 1, ag: 0 },
  "975a9b31-3f04-4587-b77e-2282dec95188": { constant: 6.6, category: "SK", name: "Threat - Metropolis", yct: 120, ad: 0, ae: 1, af: 1, ag: 0 },
  "c292f47e-d8ff-483f-bfd7-aa43937f0e2e": { constant: 2.0, category: "DZ", name: "Threat - Metropolis", yct: 39, ad: 0, ae: 1, af: 1, ag: 0 },
  "6add3ab9-52c0-4c13-abc9-506dfa89faa6": { constant: 11.1, category: "CB", name: "Sheer Ice Torrent", yct: 333, ad: 0, ae: 1, af: 1, ag: 0 },
  "d3ddf678-adb0-4157-ae10-21c2667c7ba8": { constant: 7.8, category: "SK", name: "Sheer Ice Torrent", yct: 333, ad: 0, ae: 1, af: 1, ag: 0 },
  "e23637e8-fe15-4d9a-b3c9-9e059745ad3c": { constant: 2.0, category: "DZ", name: "Sheer Ice Torrent", yct: 333, ad: 0, ae: 1, af: 1, ag: 0 },
  "a8d6dfa7-b879-4eef-a10a-dbbd46519583": { constant: 12.2, category: "CB", name: "大月墜落狂想", yct: 231, ad: 3, ae: 2, af: 2, ag: 2 },
  "9eb53fd3-a91c-45c6-8608-f3a76eecf9f7": { constant: 8.0, category: "SK", name: "大月墜落狂想", yct: 157, ad: 0, ae: 1, af: 1, ag: 0 },
  "ca751a94-f71e-4556-9d54-76de325ca29c": { constant: 2.0, category: "DZ", name: "大月墜落狂想", yct: 37, ad: 0, ae: 1, af: 1, ag: 0 },
"addba2e9-ad45-4770-b850-717ab2e0e17d": { constant: 10.6, category: "CB", name: "FULi AUTO SHOOTER", yct: 192, ad: 0, ae: 1, af: 1, ag: 0 },
"423e7ae7-97e9-4c87-a778-36af2020a59d": { constant: 7.2, category: "SK", name: "FULi AUTO SHOOTER", yct: 145, ad: 0, ae: 1, af: 1, ag: 0 },
"d93cfe14-d3b1-4934-98a4-77b89e1f1304": { constant: 3.0, category: "DZ", name: "FULi AUTO SHOOTER", yct: 65, ad: 0, ae: 1, af: 1, ag: 0 },
"825405cb-d262-4f10-9e98-4d967e4e33f4": { constant: 11.3, category: "CB", name: "cafe in 6412I731V", yct: 211, ad: 0, ae: 1, af: 1, ag: 0 },
"faf0dc82-df37-456a-b726-283e27df9c31": { constant: 7.0, category: "SK", name: "cafe in 6412I731V", yct: 133, ad: 0, ae: 1, af: 1, ag: 0 },
"54c60c83-9a80-458d-bf11-b04be1af1977": { constant: 2.0, category: "DZ", name: "cafe in 6412I731V", yct: 49, ad: 0, ae: 1, af: 1, ag: 0 },
"5c0778d6-b2db-444f-a911-7892ffdf3ba5": { constant: 11.6, category: "CB", name: "KASANE", yct: 223, ad: 0, ae: 1, af: 1, ag: 0 },
"3b11fea9-a2e3-40f7-bbe2-196cfcf25a1c": { constant: 7.8, category: "SK", name: "KASANE", yct: 145, ad: 0, ae: 1, af: 1, ag: 0 },
"76aebcf6-d55d-4490-b48a-1fc3162a974a": { constant: 3.0, category: "DZ", name: "KASANE", yct: 53, ad: 0, ae: 1, af: 1, ag: 0 },
  "bab866eb-1919-4133-9ea5-0d780e17aa48": { constant: 10.4, category: "CB", name: "Fantasia Sonata Stars", ad: 0, ae: 1, af: 1, ag: 0 },
  "fa7c3e3f-29c3-4a27-a656-7696cbcd975e": { constant: 6.8, category: "SK", name: "Fantasia Sonata Stars", ad: 0, ae: 1, af: 1, ag: 0 },
  "c4670dbb-6bad-4ae5-baef-4f2400b3ba41": { constant: 2.0, category: "DZ", name: "Fantasia Sonata Stars", ad: 0, ae: 1, af: 1, ag: 0 },
  "4e844cd0-d532-486a-bf46-3fcf77dc3914": { constant: 10.5, category: "CB", name: "Fantasia Sonata Sky Syndrome", ad: 0, ae: 1, af: 1, ag: 0 },
  "9a53b7e0-fc48-4203-ace2-872a12fe7ec4": { constant: 7.0, category: "SK", name: "Fantasia Sonata Sky Syndrome", ad: 0, ae: 1, af: 1, ag: 0 },
  "dd3934f9-5a39-4086-b859-03c164db27ef": { constant: 2.5, category: "DZ", name: "Fantasia Sonata Sky Syndrome", ad: 0, ae: 1, af: 1, ag: 0 },
  //特殊谱面
  //剧情谱面，显示定数为3
  "eb802d90-72c0-4b95-856a-b2951a57c0ec": { constant: -1, category: "CB*", name: "Sheer Ice Torrent", ad: 0, ae: 1, af: 1, ag: 0 },
  "d3ddf678-adb0-4158-ae10-21c2667c7ba8": { constant: -1, category: "SK*", name: "Sheer Ice Torrent", ad: 0, ae: 1, af: 1, ag: 0 },
  "e23637e8-fe16-4d9a-b3c9-9e059745ad3c": { constant: -1, category: "DZ*", name: "Sheer Ice Torrent", ad: 0, ae: 1, af: 1, ag: 0 },
  //愚人节
  "eade667e-610b-419c-bc3d-503d7946d1ea": { constant: -1, category: "SP", name: "Welcome to Milthm", ad: 0, ae: 1, af: 1, ag: 0 },
  "1ccef645-09b6-400d-a438-b2f2fdc0debc": { constant: -1, category: "SP", name: "选择你的宽带", ad: 0, ae: 1, af: 1, ag: 0 },
  "cc508ca6-5d5f-4222-a4a9-3a8cfbaac03e": { constant: -1, category: "SP", name: "Algebra", ad: 0, ae: 1, af: 1, ag: 0 },
  "242edead-e9cd-428d-9799-f8a603109fc6": { constant: -1, category: "SP", name: "Rainbow Flavor!", ad: 0, ae: 1, af: 1, ag: 0 },
  "9bccf0ee-58d6-41cc-8885-2ab1ba25cc2a": { constant: -1, category: "SP", name: "KAEDE", ad: 0, ae: 1, af: 1, ag: 0 },
  
};
       
/* ========== 全局变量 ========== */
let columns = 3; //默认三列布局
/* ========== DOMContentLoaded 事件 ========== */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
});
/* ========== Reality 计算相关 ========== */
function reality(score,c) {
    if (score >= 1005000) return Math.max(1+c,0);
    if (score >= 995000) return Math.max(1.4 / (Math.exp(-3.65 * (score / 10000 - 99.5)) + 1) - 0.4+c,0);
    if (score >= 980000) return Math.max(((Math.exp(3.1 * (score - 980000) / 15000) - 1) / (Math.exp(3.1) - 1)) * 0.8 - 0.5+c,0);
    if (score >= 700000) return Math.max(score / 280000 - 4+c,0);
    return 0;
}

function findScore(constant, target) {
    if (target <= constant-1.5) return 700000;
    if (target > 1 + constant) return "Unable to deduce points"; 
    if (target == (1 + constant)) return 1005000;
    if (target > 0.3 + constant) {
        return Math.ceil(10000 * (99.5 + Math.log((1.4 / (target + 0.4 - constant)) - 1) / -3.65));
    } else if (target > -0.5 + constant) {
        return Math.ceil(980000 + 15000 * (Math.log(((target + 0.5 - constant) / 0.8) * (Math.exp(3.1) - 1) + 1) / 3.1));
    } else {
        return Math.ceil((target-constant+4)*280000);
    }
    return 114514;
}

/* ========== 核心流程 ========== */
function processData() {
    const inputData = cleanInputData(document.getElementById('inputData').value);
    const format = isNewFormat(inputData) ? 'new' : 'old';
    const { username, items } = processDataByFormat(inputData, format);
  // 全局保存
  window.processedItems = items;
  // 清空输出区域以避免多次解析时内容堆叠
  document.getElementById('output').innerHTML = '';
  // 根据单曲 Reality 原始值排序
  items.sort((a, b) => b.singleRealityRaw - a.singleRealityRaw);
  // 显示用户信息
    drawUserInfo(username, items);
  // 绘制所有卡片
  items.forEach(drawCard);
  
  // 格式化写回 inputData
    formatInput(username, items);
}

/* ========== 工具函数 ========== */
function cleanInputData(data) {
    return data.replace(/\n/g, '').replace(/  /g, '');
}

function isNewFormat(data) {
    return /^\[.*\],\{.*\}$/.test(data);
}

function processDataByFormat(data, format) {
  const cleaned = cleanInputData(data);
  return format === 'new' ? processNewFormat(cleaned) : processOldFormat(cleaned);
}

function processNewFormat(data) {
  const [, username, songDataStr] = data.match(/^\[(.*?)\],\{(.*)\}$/);
  const songData = songDataStr.split('],[');
  const items = songData.map(processSong);
  return { username, items };
}

function processOldFormat(data) {
  const start = data.indexOf('{"UserName":');
  const end = data.indexOf('}]}') + 3;
  const str = data.slice(start, end);
  
  const parsed = tryParseJSON(str);
  if (!(parsed && parsed.SongRecords)) {
        alert_invalid();
        return { username: "", items: [] };
    }
  const items = parsed.SongRecords
    .map(processSongFromOldFormat)
    .filter(Boolean);
  
  return { username: parsed.UserName, items };
}

function processSong(song) {
    const [title, category, constant, score, accuracy, level] = song.replace(/[\[\]]/g, '').split(',');
  const constantVal = parseFloat(constant);
  const scoreVal = parseInt(score, 10);
  const accuracyVal = parseFloat(accuracy);
  const levelVal = parseInt(level, 10);
  
  const singleRealityRaw = reality(scoreVal,constantVal);
  
    return {
    singleRealityRaw,
    singleReality: singleRealityRaw.toFixed(2),
    constant: constantVal, // 移除 toFixed(1)
        name: title,
        category,
    bestScore: scoreVal,
    bestAccuracy: accuracyVal.toFixed(4),
    bestLevel: levelVal
    };
}

function processSongFromOldFormat(record) {
    const { BeatmapID, BestScore, BestAccuracy, BestLevel } = record;
  const constantObj = constants[BeatmapID];
  
  if (!constantObj) return null;
  
  const { constant, category, name, yct } = constantObj;
  const singleRealityRaw = reality(BestScore,constant);
  
    return {
    singleRealityRaw,
    singleReality: singleRealityRaw.toFixed(2),
    constant: constant,
    name,
    category,
    yct,
    bestScore: BestScore,
    bestAccuracy: BestAccuracy.toFixed(4),
    bestLevel: BestLevel
    };
}

function formatInput(username, items) {
  const formattedItems = items.map(item => 
    `[${item.name},${item.category},${item.constant},${item.bestScore},${item.bestAccuracy},${item.bestLevel}]`
  ).join(',\n  ');
  
  document.getElementById('inputData').value = `[${username}],{\n  ${formattedItems}\n}`;
}

function calculateAverageReality(results) {
  const filtered = results.filter(item => item.singleRealityRaw > 0);
  const top = filtered.slice(0, 20);
  const sum = top.reduce((acc, item) => acc + item.singleRealityRaw, 0);
  return top.length > 0 ? (sum / 20).toFixed(4) : '0.0000';
}

/* ========== 显示用户信息 ========== */
function drawUserInfo(username, results) {
  const userInfoDiv = document.getElementById('userInfo');
  const usercontainer = document.getElementById('usercontainer');
  usercontainer.style.display = 'block';
  const avg = calculateAverageReality(results);
  userInfoDiv.innerHTML = `${username} ${avg}`;
  window.username = username;
  window.average = avg;
}

/* ========== 绘制单张卡片 ========== */
function drawCard(result, index) {
    const outputDiv = document.getElementById('output');
    const card = document.createElement('div');
    card.classList.add('card');
  // 背景
    card.style.background = result.bestLevel === 0
        ? 'linear-gradient(135deg, #8400C3,#3030B0,#2e61ef)'
        : 'linear-gradient(45deg, #4028d7, #8839fe)';
    card.style.color = '#DDA0DD';
  // 计算基础字号
    let baseFontSize = (window.innerWidth * window.innerHeight) / 50000; //60000
    if (baseFontSize >=10){
      baseFontSize = 10;
    }
    let fontSize = (baseFontSize * 4) / columns;
  const marginBottom = (baseFontSize * 4) / columns;
  // 标题
    const title = document.createElement('div');
    title.classList.add('title');
    title.innerText = result.name;
    card.appendChild(title);
    const maxCardWidth = card.offsetWidth * 0.7;
    title.style.fontSize = `${fontSize * 1.3}px`;
    title.style.whiteSpace = 'nowrap';
    title.style.overflow = 'hidden';
    title.style.textOverflow = 'ellipsis';
  // 若标题过长就减小字号
    while (title.offsetWidth > maxCardWidth && fontSize > 2) {
    fontSize--;
        title.style.fontSize = `${fontSize}px`;
    }
  // Info 行
    const info = document.createElement('div');
    info.classList.add('info');
  Object.assign(info.style, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'visible',
    textOverflow: 'ellipsis',
    fontSize: `${fontSize}px`,
    marginBottom: `${marginBottom}px`
  });
  const constantText = `${parseFloat(result.constant).toFixed(1)}->&nbsp`;
    const singleRealitySpan = document.createElement('span');
    singleRealitySpan.innerHTML = parseFloat(result.singleReality).toFixed(2);
  // 根据分数变色
    if (result.bestScore >= 1005000) {
        singleRealitySpan.style.color = '#1cd3b4';
    } else if (result.singleReality == 0) {
        singleRealitySpan.style.color = '#a5a5a5';
    } else if (result.singleReality < 0) {
        singleRealitySpan.style.color = '#ff4040';
    }
    info.innerHTML = `${result.category} ${constantText}`;
    info.appendChild(singleRealitySpan);
  // 准度
    const accuracySpan = document.createElement('span');
    accuracySpan.classList.add('accuracy');
    accuracySpan.innerHTML = `&nbsp&nbsp${(result.bestAccuracy * 100).toFixed(2)}%`;
  Object.assign(accuracySpan.style, {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
    overflow: 'visible'
  });
    info.appendChild(accuracySpan);
    card.appendChild(info);
  // 分数
    const score = document.createElement('div');
    score.classList.add('score');
    score.innerText = result.bestScore;
    score.style.fontSize = `${fontSize * 2.5}px`;
    score.style.marginBottom = `${marginBottom}px`;
    score.style.whiteSpace = 'nowrap';
    score.style.overflow = 'hidden';
  // 根据等级分数渐变
if (result.bestLevel < 2) {
    Object.assign(score.style, {
      background: 'linear-gradient(to right, #12a9fb, #ee80ff)',
      color: 'transparent',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text'
    });
} else if (result.bestLevel === 2) {
    Object.assign(score.style, {
      background: 'linear-gradient(to right, #5e94f3, #80b2ff)',
      color: 'transparent',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text'
    });
} else {
    score.style.color = '#D1D1D1';
}

    card.appendChild(score);
  // 序号
    const indexElem = document.createElement('div');
    indexElem.classList.add('index');
    indexElem.innerText = `#${index + 1}`;
  Object.assign(indexElem.style, {
    fontSize: `${fontSize}px`,
    marginBottom: `${marginBottom}px`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  });
    card.appendChild(indexElem);
  // 加入到输出
    outputDiv.appendChild(card);
}

/* ========== 列数调整 ========== */
function changeColumns(delta) {
    columns = Math.max(1, columns + delta);
    document.querySelector('.container').style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    document.getElementById('output').innerHTML = ''; 
    processData();
}

/* ========== 文件处理等原有逻辑 ========== */
function upl() {
  document.getElementById('fileupLoad').click();
}

document.getElementById('fileupLoad').addEventListener("change", async function (e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.db')) {
      const reader = new FileReader();
      reader.onload = async () => {
          const SQL = await initSQL();  // 加载 SQL.js
          const db = new SQL.Database(new Uint8Array(reader.result));
          const tables = getAllTables(db); // 获取数据库中的所有表
  
          if (tables.includes("kv")) {
              // 使用 saves.db 的解析方式
              processDBFile(reader.result, SQL);
          } else if (tables.includes("scores")) {
              // 使用 data.db 的解析方式
              const scores = extractScores(db);
              processHistoryRecords(scores);
              alert("注意：data.db内只包含您将Milthm更新至3.2版本之后的游玩记录，如有需要请上传save.db\n\nNote: The data.db file only contains your play records after updating Milthm to version 3.2. If needed, please upload save.db.");
          } else {
              console.error("数据库不包含 'kv' 或 'scores' 表，无法解析\nThe database does not contain the 'kv' or 'scores' table and cannot be parsed.");
          }
      };
      reader.readAsArrayBuffer(file);
  } else {
      // 如果不是 .db 文件，执行第3种操作
      const reader = new FileReader();
      reader.onload = () => handleFile(reader.result, fileName);
      reader.onerror = () => alert("读取文件失败\nFailed to read the file.");
      reader.readAsText(file);
  }
  
});
function getAllTables(db) {
  try {
      const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");
      let tables = [];
      while (stmt.step()) {
          tables.push(stmt.getAsObject().name);
      }
      stmt.free();
      return tables;
  } catch (error) {
      console.error("无法获取数据库表:", error, "\nFailed to retrieve database tables:", error);
      return [];
  }
}

function extractScores(db) {
  let scores = [];
  try {
      const stmt = db.prepare("SELECT * FROM scores");
      while (stmt.step()) {
          let row = stmt.getAsObject();
          scores.push(row);
      }
      stmt.free();
  } catch (error) {
      console.error("提取 scores 失败:", error, "\nFailed to extract scores:", error);
  }
  return scores;
}

function processHistoryRecords(scores) {
  for (let i = 0; i < scores.length; i++) {
      const scoreData = scores[i];
      const chartid = scoreData.chart_id;
      const score = scoreData.score;
      const constantData = constants[chartid];
      const score_accuracy = scoreData.score_accuracy*100
      if (constantData) {
          const { constant, category, name, yct, ad,ae,af,ag } = constantData;
          const singleReality = reality(score,constant);
          scoreData.constant = constant;
          scoreData.category = category;
          scoreData.name = name;
          scoreData.singleReality = singleReality;
          //分析表相关内容
          scoreData.h = (score_accuracy < 99 || score < 10000 * score_accuracy) ? 0 : (constant * 0.1 + 1) * Math.pow((score - 5000 * score_accuracy - 500000) / 10000, 2);//准度
          if (ad) scoreData.d = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ad : ad);//底力
          if (ae) scoreData.e = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ae : ae);//手法
          if (af) scoreData.f = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * af : af);//读谱
          if (ag) scoreData.g = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ag : ag);//多指
      } else {
          console.warn(`未找到对应的 chartid: ${chartid}`);
          // 删除当前scoreData对象
          scores.splice(i, 1);
          i--;  // 调整索引以便继续遍历下一个元素
      }
  }

  // 计算 r30 和 r10
  const { r30, r10 } = calculateRecentScores(scores);
  console.log("r30 (最近30条成绩):", r30.sort((a, b) => b.singleReality - a.singleReality));
  const userrealityHistory= calculateUserReality(scores);
  const username = scores[0]?.username;
  formatInput(username, items);
  drawAndDownloadUserRealityChart(userrealityHistory,r10,scores);
  processData()
}


function calculateRecentScores(scores) {
  scores = scores.filter(item => item.constant >= 0);
  // 先按游玩时间升序排列，确保 r30 维护最近的成绩
  scores.sort((a, b) => new Date(a.played_at) - new Date(b.played_at));
  let r30 = [];
  let seenCharts = new Set();
  scores.forEach(scoreData => {
      const { chart_id, score} = scoreData;
      // 是否是新曲面
      const isNewChart = !seenCharts.has(chart_id);
      // 条件写入规则
      const shouldInsert = 
          score >= 1000000 ||                  // 分数大于等于 1000000
          isNewChart ||                        // 第一次游玩该谱面
          score > getBestScore(chart_id, r30) || // 分数高于历史最佳
          causesChartReduction(r30);  // 写入会导致不同谱面数小于 10
      if (shouldInsert) {
          // 直接写入（如果已满则踢掉最早的成绩）
          if (r30.length >= 30) {
              r30.shift();
          }
          r30.push(scoreData);
          seenCharts.add(chart_id);
      }
  });
  const r10 = [];
  const usedCharts = new Set();
  r30.sort((a, b) => b.singleReality - a.singleReality);
  for (let i = 0; i < r30.length && r10.length < 10; i++) {
      if (!usedCharts.has(r30[i].chart_id)) {
          r10.push(r30[i]);
          usedCharts.add(r30[i].chart_id);
      }
  }
  return { r30, r10 };
}

// 获取某个 chart_id 在 r30 中的最高分
function getBestScore(chart_id, r30) {
  let bestScore = 0;
  for (let record of r30) {
      if (record.chart_id === chart_id) {
          bestScore = Math.max(bestScore, record.score);
      }
  }
  return bestScore;
}

// 判断写入是否会导致不同谱面数小于 10
function causesChartReduction(r30) {
  let uniqueCharts = new Set(r30.map(record => record.chart_id));
  return uniqueCharts.size <= 10;
}

function calculateUserReality(scores) {
  let b20_lg = new Map(); // 存储所有不同谱面的最高得分记录 (chart_id -> scoreData)
  let userrealityHistory = []; // 记录 userreality 变化历史
  let lastUserReality = null; // 记录上一次的 userreality
  scores.forEach(scoreData => {
      const { chart_id, score,played_at } = scoreData;
      // **修改点：b20_lg 存储所有曲目的最高分**
      if (!b20_lg.has(chart_id) || b20_lg.get(chart_id).score < score) {
          b20_lg.set(chart_id, scoreData);
      }
      let b20 = Array.from(b20_lg.values())
          .sort((a, b) => b.singleReality - a.singleReality) // 按 singleReality 降序排序
          .slice(0, 20); // 取最高的 20 条
let filteredReality = b20.slice(0, 20).filter(data => data.singleReality > 0);
let sumReality = filteredReality.reduce((sum, data) => sum + data.singleReality, 0);
      let userreality = sumReality / 20;
      // 检测 userreality 是否发生变化
      if (lastUserReality === null || userreality !== lastUserReality) {
          userrealityHistory.push({ userreality, played_at });
          lastUserReality = userreality;
      }
  });
  const gradeMap = { R: 0, AP: 1, FC: 2, S: 3, A: 4, B: 5, C: 6, F: 7 };
  window.items = Array.from(b20_lg.values()).map(({ score, singleReality, score_accuracy, grade, ...rest }) => ({
      ...rest,
      bestScore: score,
      singleRealityRaw: singleReality,
      singleReality: singleReality.toFixed(2),
      bestAccuracy: score_accuracy,
      bestLevel: gradeMap[grade] ?? 7 // 默认 F 等级
  }));  
  return userrealityHistory;
}

function drawAndDownloadUserRealityChart(userrealityHistory, r10, scores) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 2000;
  canvas.height = 1500;
  // 加载背景图片
  const bgImage = new Image();
  bgImage.src = "./jpgs/背景.jpg";
  bgImage.onload = function () {
      // 绘制背景图（不会覆盖其他元素）
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      // 折线图区域：右上 1/4，留 10px 间距，表格高度减少 30px
      const chartX = 1050, chartY = 50, chartWidth = 900, chartHeight = 500;
      // 解析用户现实历史数据
      const times = userrealityHistory.map(data => new Date(data.played_at).getTime());
      const realities = userrealityHistory.map(data => data.userreality);
      const [minTime, maxTime] = [Math.min(...times), Math.max(...times)];
      const [minReality, maxReality] = [Math.min(...realities), Math.max(...realities)];
      // 设置时间坐标轴的刻度
      const scaleX = (time) => chartX + ((time - minTime) / (maxTime - minTime)) * chartWidth;
      const scaleY = (reality) => chartY + chartHeight - ((reality - minReality) / (maxReality - minReality)) * chartHeight;
      // 绘制表格
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
          let y = chartY + (chartHeight / 5) * i;
          ctx.beginPath();
          ctx.moveTo(chartX, y);
          ctx.lineTo(chartX + chartWidth, y);
          ctx.stroke();
      }
      for (let i = 0; i <= 6; i++) {
          let x = chartX + (chartWidth / 6) * i;
          ctx.beginPath();
          ctx.moveTo(x, chartY);
          ctx.lineTo(x, chartY + chartHeight);
          ctx.stroke();
      }
      // 绘制折线趋势，并填充折线以下的区域
ctx.fillStyle = "rgba(206, 238, 249, 0.5)"; // 半透明淡蓝色
ctx.beginPath();
// 起始点（第一个数据点）
ctx.moveTo(scaleX(times[0]), scaleY(realities[0]));
// 连接所有数据点
userrealityHistory.forEach((data, i) => {
    let x = scaleX(times[i]), y = scaleY(realities[i]);
    ctx.lineTo(x, y);
});
// 连接到底部封闭区域
ctx.lineTo(scaleX(times[times.length - 1]), chartY + chartHeight); // 右下角
ctx.lineTo(scaleX(times[0]), chartY + chartHeight); // 左下角
ctx.closePath();
// 填充颜色
ctx.fill();
// 重新绘制折线，避免被填充色覆盖
ctx.strokeStyle = "rgba(200, 237, 249, 0.9)";
ctx.lineWidth = 3;
ctx.beginPath();
userrealityHistory.forEach((data, i) => {
    let x = scaleX(times[i]), y = scaleY(realities[i]);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
});
ctx.stroke();

      // 时间坐标：显示基于当前时间的时间差
      const now = new Date();
      const totalTime = now.getTime() - minTime;
      const interval = totalTime / 5;
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      for (let i = 0; i < 5; i++) {
          let x = chartX + (i * chartWidth) / 5;
          let time = minTime + i * interval;
          let timeDiff = now.getTime() - time;
          let timeLabel = formatTimeDiff(timeDiff);
          ctx.fillText(timeLabel, x, chartY + chartHeight + 30);
      }
      
      // 右下角显示“now”
      ctx.fillText("now", chartX + chartWidth, chartY + chartHeight + 30);
      // userreality 刻度
      ctx.textAlign = "right";
      for (let i = 0; i < 5; i++) {
          let reality = minReality + (maxReality - minReality) * (i / 4);
          let y = scaleY(reality);
          ctx.fillText(reality.toFixed(2), chartX - 10, y);
      }
      console.log("数据", items);
      
      // 分析图
      const calculateMetric = (items, key, multiplier, divisor) => {
          return multiplier * (
              items.map(item => item[key])
                  .filter(value => value !== undefined)
                  .sort((a, b) => b - a)
                  .slice(0, 7)
                  .reduce((sum, value) => sum + value, 0) / 7 || 0
          ) / divisor;
      };
      const d = calculateMetric(items, 'd', 70, 22.5);
      const e = calculateMetric(items, 'e', 70, 30.5);
      const f = calculateMetric(items, 'f', 2.5, 1);
      const g = calculateMetric(items, 'g', 7, 1);
      const h = calculateMetric(items, 'h', 80.5, 15.38);
      // 添加标题
      ctx.textAlign = "center";
      ctx.fillText("User Reality 变化趋势", chartX + chartWidth / 2, chartY - 10);
      ctx.fillText("(由Panyi提供计算方式)", 1850, 1380);
      ctx.font = "40px Arial";
      ctx.fillText("最近游玩", 400, 110);
      ctx.fillText("r10记录(测试,无实际用途)", 400, 760);
      // 绘制雷达图
      drawRadarChart(ctx, [d, e, f, g, h], 1150, 680, 700, 700);
      // 绘制最近 10 次的分数卡片
      lg_drawCards(ctx, scores.slice(-10).reverse(), 50, 150).then(() => {
          // 绘制 r10 记录
          lg_drawCards(ctx, r10, 50, 800).then(() => {
              // 生成下载链接
              const link = document.createElement("a");
              link.download = "user_reality_chart.png";
              link.href = canvas.toDataURL("image/png");
              link.click();
          });
      });
  };
}


function drawRadarChart(ctx, data, x, y, width, height) {
  const labels = ['底力', '手法', '读谱', '多指', '准度']; // 按指定顺序绘制
  const maxDataValue = Math.max(...data); // 计算数据中的最大值
  // 计算 maxVal，使其比 maxDataValue 大，并且是 0.5 的倍数
  const maxVal = Math.ceil(maxDataValue * 2) / 2;
  const numScales = 8; // 8个刻度
  const scaleStep = maxVal / (numScales - 1); // 计算刻度间距，确保是0.1的倍数
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const radius = Math.min(width, height) / 2;
  ctx.strokeStyle = "#ccc";
  ctx.fillStyle = "rgba(219, 245, 255, 0.5)";
  // 绘制刻度线
  for (let i = 0; i < numScales; i++) {
      const scaleRadius = (i / (numScales - 1)) * radius;
      ctx.beginPath();
      for (let j = 0; j < labels.length; j++) {
          const angle = (Math.PI * 2 / labels.length) * j - Math.PI / 2;
          const px = centerX + scaleRadius * Math.cos(angle);
          const py = centerY + scaleRadius * Math.sin(angle);
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
  }
  // 绘制刻度值
  ctx.fillStyle = "white";
  ctx.font = "12px Arial";
  for (let i = 0; i < numScales; i++) {
      const scaleValue = (i * scaleStep).toFixed(1);
      const scaleRadius = (i / (numScales - 1)) * radius;
      ctx.fillText(scaleValue, centerX, centerY - scaleRadius);
  }
  // 画雷达数据区域
  ctx.beginPath();
  ctx.fillStyle = "rgba(210, 244, 255, 0.5)";
  data.forEach((value, index) => {
      const angle = (Math.PI * 2 / data.length) * index - Math.PI / 2;
      const scaledValue = (value / maxVal) * radius;
      const px = centerX + scaledValue * Math.cos(angle);
      const py = centerY + scaledValue * Math.sin(angle);
      index === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // 绘制标签（白色字体）
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  labels.forEach((label, index) => {
      const angle = (Math.PI * 2 / labels.length) * index - Math.PI / 2;
      const px = centerX + (radius + 20) * Math.cos(angle);
      const py = centerY + (radius + 20) * Math.sin(angle);
      ctx.fillText(`${label}: ${data[index].toFixed(2)}`, px, py);
  });
}


function formatTimeDiff(timeDiff) {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `-${days}d`;
  } else if (hours > 0) {
    return `-${hours}h`;
  } else {
    return `-${minutes}m`;
  }
}


function lg_drawCards(ctx, items, xOffset, yOffset) {
  const scale = 1;
  const cardWidth = 340 * scale;
  const cardHeight = 100 * scale;
  const imgWidth = 110 * scale;
  const imgHeight = 70;
  const columnSpacing = 360 * scale;
  const rowSpacing = 110 * scale;
  const imagePromises = items.map((item, i) => {
      const x = xOffset + (i % 2) * columnSpacing;
      const y = yOffset + Math.floor(i / 2) * rowSpacing;
      // 卡片背景
      ctx.fillStyle = 'rgba(104, 118, 122, 0.4)';
      ctx.fillRect(x, y, cardWidth, cardHeight);
      // 编号
      ctx.font = `${13 * scale}px Arial`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillStyle = (i < 10) ? '#FAFAFA' : '#C9C9C9';
      ctx.fillText(`#${i + 1}`, x + cardWidth - 10, y + 5);
      // 分数：不足7位前补0
      let strScore = item.score.toString().padStart(7, '0');
      // 分数颜色
      let scoreColor;
      if (item.bestLevel < 2) {
          const gradient = ctx.createLinearGradient(x, y + 40 * scale, x, y + 70 * scale);
          gradient.addColorStop(0, '#99C5FB');
          gradient.addColorStop(1, '#D8C3FA');
          scoreColor = gradient;
      } else if (item.bestLevel === 2) {
          scoreColor = '#90CAEF';
      } else {
          scoreColor = '#FFFFFF';
      }
      ctx.font = `${28 * scale}px Arial`;
      ctx.textAlign = 'left';
      ctx.fillStyle = scoreColor;
      ctx.fillText(strScore, x + 128, y + 42 * scale);
      ctx.font = `${15 * scale}px Arial`;
      ctx.textAlign = 'left';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`P:${(item.score_perfect_count+item.score_exact_count).toString()}(+${item.score_exact_count.toString()})`, x + 240, y +48 * scale);
      ctx.fillText(`G:${item.score_good_count.toString()}  L:${item.score_bad_count.toString()}/${item.score_miss_count.toString()}`, x + 240, y + 68 * scale);
      const maxTextWidth = 200;
      let currentFontSize = 19 * scale;
      ctx.font = `${currentFontSize}px Arial`;
      let textWidth = ctx.measureText(item.name).width;
      while (textWidth > maxTextWidth && currentFontSize > 10) {
          currentFontSize--;
          ctx.font = `${currentFontSize}px Arial`;
          textWidth = ctx.measureText(item.name).width;
      }
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(item.name, x + 130, y + 18);
      // Reality + Accuracy
      ctx.font = `${15 * scale}px Arial`;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`${item.category} ${parseFloat(item.constant).toFixed(1)} > ${item.singleReality.toFixed(2)}`, x + 130, y + 75 * scale);
      // 曲绘图
      const imgPath = `./jpgs/${encodeURIComponent(item.name)}.jpg`;
      return loadImage(imgPath).then(img => {
          ctx.drawImage(img, x + 10 * scale, y + 13 * scale, imgWidth, imgHeight);
      }).catch(() => {
          // Fallback image if specific image fails to load
          return loadImage('./jpgs/NYA.jpg').then(img => {
              ctx.drawImage(img, x + 10 * scale, y + 10 * scale, imgWidth, imgHeight);
          });
      });
  });
  // 等待所有图片加载完成
  return Promise.all(imagePromises);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// **初始化 SQL.js**
async function initSQL() {
  const response = await fetch('./js/sql-wasm.wasm');
  const wasmBinary = await response.arrayBuffer();
  const SQL = await initSqlJs({
    locateFile: filename => `./js/${filename}`,
    wasmBinary // 使用 ArrayBuffer 而不是 wasm streaming
  });
  return SQL;
}


// **处理 SQLite 数据库文件**
async function processDBFile(arrayBuffer, SQL) {
  try {
      const db = new SQL.Database(new Uint8Array(arrayBuffer));
      // 查询 `kv` 表中的 `PlayerFile`
      const results = db.exec("SELECT value FROM kv WHERE key='PlayerFile'");
      if (results.length === 0 || results[0].values.length === 0) {
          alert("未找到 PlayerFile 存档");
          return;
      }
      // 提取 JSON 并解析
      const playerFileJSON = results[0].values[0][0]; 
      const extracted = extractJSON(playerFileJSON);
      if (extracted) {
          document.getElementById('inputData').value = extracted;
          processData();
      } else {
          alert("数据库存档解析失败！\nDatabase save parsing failed!");
      }
  } catch (error) {
      alert(`解析数据库失败: ${error.message}\nFailed to parse database: ${error.message}`);
  }
}

function handleFile(content, fileName) {
  const inputDataElem = document.getElementById('inputData');

  if (fileName.endsWith('.json')) {
    const extracted = extractJSON(content);
    if (extracted) {
      inputDataElem.value = extracted;
      processData();
    } else {
      alert("提取 JSON 数据失败！\nFailed to extract JSON data!");
    }
  } else if (fileName.endsWith('.xml')) {
    processXMLFile(content);
  } else if (fileName === 'prefs') {
    processPrefsFile(content);
  } else if (fileName.endsWith('.reg')) {
    processRegFile(content);
  } else if (fileName.endsWith('.txt')) {
    inputDataElem.value = content;
    processData();
  } else if (fileName.endsWith('.png')) {
    parsePNGFile(content);
  } else {
    alert("不支持的文件类型！\nUnsupported file type!");
  }
}

function parsePNGFile(content) {
  // 使用正则表达式查找userdata:部分
  const userdataMatch = content.match(/userdata:([\s\S]+)/);

  if (userdataMatch && userdataMatch[1]) {
    // 提取userdata后的文本内容
    const userdataText = userdataMatch[1].trim();
    // 将提取的文本放入输入框
    document.getElementById('inputData').value = userdataText;
    processData();
  } else {
    alert("未找到 userdata 数据！\nCould not find userdata data!");
  }
}

function processRegFile(regContent) {
    const match = regContent.match(/"PlayerFile_h\d+"\s*=\s*hex:((?:[0-9a-fA-F]{2},?[\\\n\s]*)+)/);
    if (match) {
        const decoded = hexToString(match[1].replace(/[,\\\s\n]/g, ''));
        document.getElementById('inputData').value = decoded;
        processData();
    } else {
        alert('未找到 PlayerFile 键或值格式不正确');
    }
}

function hexToString(hexData) {
  const arr = hexData.match(/.{2}/g) || [];
  const res = arr.map(byte => String.fromCharCode(parseInt(byte, 16)));
  return res.join('');
}


function processXMLFile(xmlContent) {
  const doc = new DOMParser().parseFromString(xmlContent, "application/xml");
  const pf = doc.querySelector('string[name="PlayerFile"]');
  if (pf && pf.textContent) {
    document.getElementById('inputData').value = decodeURIComponent(pf.textContent);
        processData();
    } else {
        alert('未找到 <string name="PlayerFile"> 标签');
    }
}

function processPrefsFile(prefsContent) {
  const doc = new DOMParser().parseFromString(prefsContent, "application/xml");
  const pf = doc.querySelector('pref[name="PlayerFile"][type="string"]');
  if (pf && pf.textContent) {
    document.getElementById('inputData').value = atob(pf.textContent);
        processData();
    } else {
        alert('未找到 <pref name="PlayerFile" type="string"> 标签');
    }
}

function extractJSON(jsonString) {
    const start = jsonString.indexOf('{"UserName":');
    const end = jsonString.indexOf(']}]', start);
  return (start !== -1 && end !== -1) ? `${jsonString.slice(start, end + 3)}}` : null;
}

function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

/* ========== QQ 上传逻辑 & 其他 UI  ========== 
const qqEntry = document.getElementById("qqEntry");
const qqBotResultDialog = new mdui.Dialog("#qqBotResultDialog", { modal: true, closeOnEsc: false });
const inputData1 = document.getElementById("inputData");
const qqBotResultCloseBtn = document.getElementById("qqBotResultCloseBtn");
const qqBotResultText = document.getElementById("qqBotResultText");
const uploadButton = document.getElementById("uploadButton");
function upload() {
  qqBotResultCloseBtn.disabled = true;
  const userdata = qqEntry.value.trim();
  
  if (userdata === "") {
    mdui.alert("请输入QQ号!");
    return;
  }
  
    qqBotResultDialog.open();
    qqBotResultText.innerHTML = "正在获取数据...";
    document.getElementById("qqBotResultContent").value = '';
  const data2 = inputData1.value;
  const data_param = { nqid: userdata, data: data2, type: "milthm" };
  const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://175.27.145.108:7155", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = xhr.responseText;
          qqBotResultText.innerHTML = "执行完成。";
          document.getElementById("qqBotResultContent").value = response;
          qqBotResultCloseBtn.disabled = false;
          console.log(response);
      } else {
        qqBotResultText.innerHTML = "获取数据失败。";
        qqBotResultCloseBtn.disabled = false;
        }
      }
    };
    xhr.send(JSON.stringify(data_param));
  // 发送第二个请求
    try {
    const xhr2 = new XMLHttpRequest();
      xhr2.open("POST", "submit.php", true);
      xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr2.onreadystatechange = function() {
      if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
        console.log(xhr2.responseText);
        }
      };
    xhr2.send(JSON.stringify({ qq: userdata, data: data2 }));
    } catch (error) {
      console.error('Error request: ', error);
  }
}

function openContributionDialog() {
  new mdui.Dialog('#contributionDialog').open();
}
*/
/* ========== 下载图片 (含背景、卡片等) ========== */
function downloadImage() {
  // 获取用户输入的卡片数量
  const cardCount = parseInt(document.getElementById('cardCount').value, 10);
  const maxItems = Math.max(0, cardCount);
  // 获取数据中实际的卡片数量
  const items = window.processedItems || [];
  const excludeReality = document.getElementById('excludeReality').value;
      window.norlt = (excludeReality == "true") ? items.filter(item => item.constant == -1) : [];    
  const actualCardCount = Math.min(maxItems, items.length); // 实际绘制卡片数量，不能超过数据中的数量
  // 动态调整画布高度，保持宽度不变，最小高度为当前代码中的高度
  const baseHeight = 2200;
  const newHeight = 400 + Math.ceil(((actualCardCount+(window.norlt?.length || 0)) / 2) * 165); // 每2个卡片增加165像素的高度
  const canvasHeight = Math.max(baseHeight, newHeight); // 确保总高度不少于2200px
  const canvas = document.createElement('canvas');
  canvas.width = 1200;  // 固定宽度
  canvas.height = canvasHeight;  // 根据卡片数量调整高度
  const ctx = canvas.getContext('2d');
  let star = '';
    let maxConstant = -Infinity;
    items.forEach(item => {
      if ((item.bestLevel === 0 || item.bestLevel === 1) && item.constant > maxConstant) {
        maxConstant = item.constant;
      }
    });

    if (maxConstant > 12) {
      star = '☆☆☆';
    } else if (maxConstant > 9) {
      star = '☆☆';
    } else if (maxConstant > 6) {
      star = '☆';
    }
  // 获取背景图设置
  const bgImageFile = document.getElementById('bgImage').files[0];
  let bgImagePromise = Promise.resolve(null);
  // 如果选择了背景图文件，加载它
  if (bgImageFile) {
    bgImagePromise = loadImage(URL.createObjectURL(bgImageFile));
  } else {
    bgImagePromise = loadImage(`./jpgs/background/${Math.floor(Math.random() * 3)}.jpg`);
  }
  bgImagePromise
    .then(bgImage => {
      if (bgImage) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      const yrjds = document.getElementById('yrjds').value;//愚人节
      ctx.fillStyle = 'rgba(128, 128, 128, 0.3)';
      ctx.fillRect(0, 50, canvas.width, 200);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 3;
      ctx.moveTo(550, 250);
      ctx.lineTo(650, 50);
      ctx.stroke();
      ctx.font = '25px Arial';
      ctx.fillStyle = '#ffffff';
      if (yrjds == "true"){
      ctx.font = '23px Arial';
      ctx.fillText("☆", 719, 15);
      ctx.fillText("☆☆☆", 696, 35);
      ctx.fillText("☆☆☆☆☆", 673, 55);
      ctx.fillText("☆☆☆☆☆☆☆", 650, 75);
      ctx.font = '25px Arial';
      }else{
      ctx.fillText(star, 660, 75);
      }
      ctx.fillText(`Player: ${window.username}`, 660, 100);
    if (yrjds == "true"){
    ctx.fillText(`Reality: ${(window.average*20).toFixed(4)}`, 660, 150);
    }else{
      ctx.fillText(`Reality: ${window.average}`, 660, 150);
      }
      const now = new Date();
      const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;
      ctx.fillText(`Date: ${dateStr}`, 660, 200);
      ctx.font = '50px Arial';
      ctx.fillText('Milthm-calculator', 100, 130);
      ctx.font = '30px Arial';
      ctx.fillText('http://k9.lv/c/', 100, 180);
      ctx.font = '20px Arial';
      ctx.fillText('updata at 24.4.20 21:00', 100, 210);
      preloadImages(ctx, canvas, actualCardCount, window.norlt);
    });
}

function preloadImages(ctx, canvas, actualCardCount, norlt) {
  const items = [
    ...window.processedItems.slice(0, actualCardCount), // 获取前 actualCardCount 项
    ...norlt // 合并上 norlt 的所有项
  ];
  
  const imagePromises = items.map(item => {
    const encodedName = encodeURIComponent(item.name.replace(/[#?]/g, ''));
    const imgPath = `./jpgs/${encodedName}.jpg`;
    const rankImgPath = `./jpgs/${item.bestLevel}.png`;
    const songImgPromise = loadImage(imgPath).catch(() => loadImage('./jpgs/NYA.jpg'));
    const rankImgPromise = loadImage(rankImgPath).catch(() => null);
    return Promise.all([songImgPromise, rankImgPromise]);
  });
  Promise.all(imagePromises)
    .then(images => drawCards(ctx, canvas, items, images, actualCardCount));
}

function drawCards(ctx, canvas, items, images, actualCardCount) {
  const scale = 1.3;
  const cardWidth = 340 * scale;
  const cardHeight = 100 * scale;
  const imgWidth = 142 * scale;
  const imgHeight = 80 * scale;
  const rankIconSize = 70 * scale;
  const xOffset = 110;
  const yOffset = 350;
  const columnSpacing = 400 * scale;
  const rowSpacing = 125 * scale;
  items.forEach((item, i) => {
    const x = xOffset + (i % 2) * columnSpacing;
    const y = yOffset + Math.floor(i / 2) * rowSpacing - ((i % 2 === 0) ? 50 : 0);
    ctx.fillStyle = 'rgba(128, 128, 128, 0.4)';
    ctx.fillRect(x, y, cardWidth, cardHeight);
    ctx.font = `${13 * scale}px Arial`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = (i < 20) ? '#FAFAFA' : '#C9C9C9';
    ctx.fillText(`#${i + 1}`, x + cardWidth - 10, y + 5 * scale);
    let strScore = item.bestScore.toString().padStart(7, '0');
    let scoreColor = item.bestLevel < 2 ? 
      ctx.createLinearGradient(x, y + 40 * scale, x, y + 70 * scale) :
      (item.bestLevel === 2 ? '#90CAEF' : '#FFFFFF');
    
    if (typeof scoreColor !== 'string') {
      scoreColor.addColorStop(0, '#99C5FB');
      scoreColor.addColorStop(1, '#D8C3FA');
    }
    ctx.font = `${30 * scale}px Arial`;
    ctx.textAlign = 'left';
    ctx.fillStyle = scoreColor;
    ctx.fillText(strScore, x + 160 * scale, y + 40 * scale);
    const maxTextWidth = 200;
    let currentFontSize = 19 * scale;
    ctx.font = `${currentFontSize}px Arial`;
    let textWidth = ctx.measureText(item.name).width;
    while (textWidth > maxTextWidth && currentFontSize > 10) {
      currentFontSize--;
      ctx.font = `${currentFontSize}px Arial`;
      textWidth = ctx.measureText(item.name).width;
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(item.name, x + 163 * scale, y + 18 * scale);
    ctx.font = `${15 * scale}px Arial`;
    ctx.fillStyle = '#FFFFFF';
    const accText = `${(item.bestAccuracy * 100).toFixed(2)}%`;
    const yrjds = document.getElementById('yrjds').value;
    if (yrjds == "true"){
    ctx.fillText(`${item.category} ${item.yct || item.constant} > ${(item.singleRealityRaw * 20).toFixed(1)}   ${accText}`, x + 160 * scale, y + 75 * scale);
    }else{
    ctx.fillText(`${item.category} ${parseFloat(item.constant).toFixed(1)} > ${item.singleReality}   ${accText}`, x + 160 * scale, y + 75 * scale);
    }
    ctx.font = `${10 * scale}px Arial`;
    ctx.fillText(`>>${item.constant, Math.ceil(window.average * 100-0.5) + 0.5 !== window.average*100 ? findScore((Math.ceil(window.average * 100-0.5) + 0.5 - window.average * 100) / 5 + item.singleRealityRaw):"Unable to deduce points"}`, x + 163 * scale, y + 66 * scale);
    ctx.drawImage(images[i][0], x + 10 * scale, y + 10 * scale, imgWidth, imgHeight);
    if (images[i][1]) {
      ctx.drawImage(images[i][1], x + 270 * scale, y + 20 * scale, rankIconSize, rankIconSize);
    }
  });
  exportImage(canvas);
}

function exportImage(canvas) {
  const inputData = document.getElementById('inputData').value;

  // 1. 生成PNG图像的Base64编码数据
  const imgData = canvas.toDataURL('image/png');

  // 2. 去掉Base64数据的前缀 "data:image/png;base64,"
  const base64Data = imgData.replace(/^data:image\/png;base64,/, '');

  // 3. 将输入数据转换为字节数组
  const textData = 'userdata:' + inputData; // 将输入数据格式化为字符串
  const textDataBytes = new TextEncoder().encode(textData); // 编码为字节数组

  // 4. 解码Base64 PNG数据并创建ArrayBuffer
  const binaryData = atob(base64Data); // 解码Base64
  const pngBuffer = new ArrayBuffer(binaryData.length + textDataBytes.length);
  const uint8Array = new Uint8Array(pngBuffer);

  // 5. 将原始PNG图像数据放入新的ArrayBuffer中
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // 6. 将文本数据附加到PNG图像的后面
  for (let i = 0; i < textDataBytes.length; i++) {
    uint8Array[binaryData.length + i] = textDataBytes[i];
  }

  // 7. 创建一个Blob对象来存储PNG图像和附加数据
  const blob = new Blob([uint8Array], { type: 'image/png' });

  // 8. 创建下载链接并触发下载
  const link = document.createElement('a');
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:\-T]/g, '_').split('.')[0];
  link.download = `output_${timestamp}.png`;
  link.href = URL.createObjectURL(blob);
  link.click();

  document.getElementById('picgen').style.display = 'none';
}


function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}


