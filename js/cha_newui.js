const Updated="Updated at 2025.05.05 13:25(UTC+8)"
console.log(Updated)
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

const constantsData = {
  "5aaafcea-684f-4310-936d-67ae35956c48":[-1,"Ø","驟雨の狭間",,4.334,,,1],
  "1104f25d-2493-4bc7-9172-b262d36488ac":[-1,"SP","Oiiaioooooiai",,,3.5,4,],
  "e543f4a5-5f55-45e5-9c41-ebe1c155c12e":[-1,"SP","Dogbite",,,3,3,2.5],
  "6252f7c4-8eae-4b59-a22f-9f142f904029":[12.3,"CL","Contrasty Angeles",2,2.438,4.5,3.5,1],
  "d742e989-92c4-4474-87ef-57b218d0fc41":[12.2,"CL","命日",246,4.66,2.5,3.5,1],
  "9acd5289-bc81-49fb-afc8-7b0631e60e60":[12.1,"CL","Regnaissance",234,4.169,5,4.5,1],
  "a19a54b6-363e-49ae-9cd2-633a2db8ae4f":[11.9,"CL","Broken Conviction",215,2.35,,,4],
  "eab07c23-395d-47f3-be33-15c7c566f694":[11.7,"CL","Moonflutter",219,2.232,3,3,3.5],
  "ead657f6-f0f2-4a21-acfd-4322892a0562":[11.7,"CL","Fly To Meteor feat.兔柒",215,3.583,3.5,3.5,],
  "217898b1-4806-401f-adf5-740e9d72b66e":[10.5,"CL","雨女",203,1.192,2,1.5,],
  "cc75ce1c-dbed-4bc7-94eb-728bf36bb1ec":[12.1,"CB","Innocent white",240,3.121,4.5,4,],
  "97ef94ce-df45-4a92-9645-2456f606e0fa":[11.9,"CB","Meltovt Necrosys",211,,,,],
  "ed40cd1b-2741-415a-be81-6fcc63db4044":[11.7,"CB","HYPER MEMORIES",256,4.137,1.5,2,],
  "ef55520f-c913-449f-bf26-ab947384127e":[11.5,"CB","Broken Conviction",220,2.986,,,],
  "269efa5f-8b69-4a71-be24-7abe57372b3f":[11.5,"CB","Contrasty Angeles",217,3.568,3,3.5,],
  "e0162d0e-0727-49c2-80fa-f611621650ea":[11.4,"CB","slic.hertz #GdbG",240,,2.5,3.5,],
  "61f5e310-d45b-40dc-a934-e3a849382729":[11.4,"CB","Moonflutter",211,2.838,3,2.5,],
  "14080c32-a16c-464c-b24a-880f1a7e657d":[11.4,"CB","Algebra",220,2.945,4,3.5,],
  "6b478cca-035d-4297-b34a-ae75658d81bd":[11.3,"CB","Fragment of Memories",211,2.719,3,3,],
  "f425914c-db82-413c-aca9-96ff151b8605":[11.2,"CB","IN",225,2.745,,,],
  "da07cabf-7c7b-4083-a41a-879be13c8c94":[11.2,"CB","イコラト",219,2.484,3.5,2,],
  "01929c36-e7ba-40d5-8123-ca3d4c2da4fb":[11.2,"CB","参宿四~Betelgeuse~",217,2.013,2,3,],
  "04d821ff-493a-421d-83a5-a61a59b2d3d3":[11.1,"CB","命日",211,3.118,2.5,2,],
  "80df6e22-69c3-4983-a712-adeebb47fb2b":[11.1,"CB","Regnaissance",227,2.86,3.5,4,],
  "22bd5632-25cc-412f-9299-bcf2cdd64aed":[10.9,"CB","樱落繁花",205,2.789,4,3,],
  "f7b864bc-72a3-4c9d-ab7c-b57946fb77ec":[10.8,"CB","Elsorhg",204,,,,],
  "aafec4af-3479-445b-9b30-b6822b9f5e19":[10.8,"CB","Moving on",206,,1.5,1.5,],
  "a6ef2d0a-057b-4ada-be88-23dcde06ada5":[10.7,"CB","Hikari",193,2.44,,1.5,],
  "6db4cb9b-adec-4ce5-bb0a-71d4761e88f8":[10.6,"CB","WATER",206,1.624,1.5,2.5,],
  "13fda58e-3091-4b3d-8eb9-4ac8346ce61a":[10.6,"CB","Threat - Sky Islands",199,,5,4.5,],
  "35ab3fba-928d-4b08-be7f-2fc67a77a838":[10.5,"CB","Fly To Meteor (Milthm Edit)",191,3.183,2.5,2,],
  "7131ad7b-1602-4acd-bfc1-1ff712d054f0":[10.5,"CB","Future Unbound (Game Edit)",200,1.556,2,2.5,],
  "7c0cdf77-fcfa-4f96-9897-24ca10582c32":[10.3,"CB","Threat - Superstructure",199,,,,],
  "7cdb8a2c-e133-4a91-a29f-4e21ba4e442a":[10.3,"CB","Dogbite",203,,,,],
  "3a908e2d-8a39-4220-a6b8-4817bd1cea4a":[10.2,"CB","cybernetic blazar",205,,,,],
  "b60f0788-f9af-4a41-8c73-2b72151d309f":[10.2,"CB","Agnostic",206,,,,],
  "887157ea-fe1a-480b-b7e9-e6a4f9e27ae4":[10.1,"CB","夜風",194,,,,],
  "130d1d7d-ba20-467c-b5f5-eafc51882809":[10.1,"CB","☹",191,,,,],
  "c902851b-fa01-44f4-97a8-ab6d317fccd4":[10.0,"CB","仮想明日",208,,,,],
  "03b883cf-f28b-4e33-8f67-d3bcb1a74719":[10.0,"CB","Psyched Fevereiro",196,,,,],
  "fc40c7fc-e62a-4fa8-891e-430444191e26":[10.0,"CB","OverRain",195,,,,],
  "8d787646-a290-4f14-a831-d7d43bc9f534":[9.8,"CB","Rainbow Flavor!",185,,,,],
  "f728706a-e40a-421d-aaba-dde4bc35e8e3":[9.8,"CB","Oniichan",172,,,,],
  "fa97e341-3a72-47bc-927e-b9cf87980b37":[9.7,"CB","ネオン色のまち feat.Mai",188,,,,],
  "9e083951-188f-4998-951a-58d08b4b4f45":[9.7,"CB","Jump out?",180,,,,],
  "00e3e0b6-fbdd-4a7d-bcab-ba6540f4225d":[9.6,"CB","白虎蓮華",189,,,,],
  "df4ff6fe-a8da-4b63-b0bd-b69ac8d80ace":[9.6,"CB","Bio-Engineering",176,,,,],
  "9a55b865-0860-41b9-9f78-bc5209bc9f44":[9.5,"CB","雨女",179,,,,],
  "ca4c79a7-709a-40c5-b0e0-c04b6deff431":[9.4,"CB","烁雨",178,,,,],
  "c3769378-d595-4119-b93c-e0db2b3ea8e2":[9.3,"CB","Aconsma",175,,,,],
  "cdacaee4-2866-4109-93a8-5bbbf0dc6207":[9.3,"CB","花月",181,,,,],
  "d70bc3b4-752a-45b9-bd31-c6ab8b9a7c9e":[9.2,"CB","INFP.mp3",176,,,,],
  "725abac1-5de5-463f-870d-a99a41cae61e":[9.1,"CB","暮予星光",180,1.968,,,],
  "bb5b7628-87b1-4e1c-8e07-8bacadf6f2b1":[8.6,"CB","サイクルの欠片",154,,,,],
  "b2594118-dcf5-4750-9e57-e4eeef6142fe":[8.5,"CB","时落之雨",160,,,,],
  "6df0b462-dded-46db-8505-3ff86fc46c26":[8.3,"CB","粗线条的雨",153,,,,],
  "35b424f8-d0de-41ab-9512-f365a154c328":[8.3,"CB","Words",160,,,,],
  "858f698c-4bd9-40f0-aa8b-793021e0c550":[7.5,"CB","雨之城",134,,,,],
  "c18f27b6-2d4e-4631-82b1-4ede237874df":[9.0,"SK","Contrasty Angeles",179,,,,],
  "0785d07e-50e1-4e3f-b1aa-01fa43d0c2f6":[8.9,"SK","HYPER MEMORIES",169,,,,],
  "c9a9bc45-8695-4fb9-babe-d2027a6d9ed7":[8.8,"SK","樱落繁花",164,,,,],
  "2cfa74ee-7e6d-4ebf-8f0a-e7cfb3a7e94c":[8.7,"SK","イコラト",157,,,,],
  "63b8512d-ac16-4026-bfee-1317d860ab82":[8.7,"SK","命日",156,,,,],
  "de2327c7-0d63-496f-9974-dbb70bfcbed8":[8.6,"SK","Broken Conviction",154,,,,],
  "a5a9a7e4-3030-4bb3-9eef-04e58a0fbdb4":[8.5,"SK","Regnaissance",154,,,,],
  "2022fd8f-3210-4151-8636-8ec888236214":[8.4,"SK","Hikari",135,,,,],
  "de74f367-3a91-4421-a657-f0e8268083a3":[8.4,"SK","Fragment of Memories",154,,,,],
  "9953c1b3-f92a-406c-8ea6-78dbee1b8f71":[8.3,"SK","Bio-Engineering",167,,,,],
  "d6514d67-18d3-4d8e-8492-890061efb6f7":[8.2,"SK","花月",163,,,,],
  "14700dda-b3c7-429d-a5ce-8a65f2fe4846":[8.2,"SK","Innocent white",160,,,,],
  "962ec79e-489c-43ea-bd72-6dc3448e3983":[8.1,"SK","Algebra",153,,,,],
  "d89765a7-05a1-44a1-8ed3-f23f5f15741a":[8.0,"SK","☹",151,,,,],
  "4001a2b3-374d-438e-8e2b-2bd6d3651805":[8.0,"SK","ネオン色のまち feat.Mai",157,,,,],
  "44405d3d-4162-4fb8-9e86-fc7c965d4d2d":[8.0,"SK","Oniichan",169,,,,],
  "e663eb53-66d4-4a76-b533-445ef08ee18e":[7.9,"SK","IN",142,,,,],
  "38b25a54-afa9-4369-b286-90ba2e29df0b":[7.9,"SK","Jump out?",131,,,,],
  "dae03da2-2ff0-4ed1-9624-945c2b9d3118":[7.9,"SK","Moonflutter",135,,,,],
  "e7ec6340-be44-44ab-8545-d5b7cf326fd4":[7.8,"SK","Meltovt Necrosys",132,,,,],
  "e75e2d80-86a0-464f-8d29-8dd0bb68328b":[7.8,"SK","サイクルの欠片",134,,,,],
  "b1361177-1426-47cc-b036-afd09cad775b":[7.8,"SK","cybernetic blazar",147,,,,],
  "fccd5960-dbdc-4127-8b0b-58c1fb521354":[7.6,"SK","OverRain",144,,,,],
  "26a76638-ec89-4809-bd40-5d6afe403c40":[7.6,"SK","slic.hertz #GdbG",140,,,,],
  "640cea92-0024-4ba5-aa16-8a38f77743ac":[7.5,"SK","Elsorhg",131,,,,],
  "ac9308f8-b896-43af-879a-b65bcfcaa874":[7.5,"SK","Rainbow Flavor!",132,,,,],
  "bdf2975e-8b19-4af8-9b1c-dc6f62587e7c":[7.5,"SK","暮予星光",138,,,,],
  "3442183b-cf7d-4842-9ddf-04243914916a":[7.5,"SK","Future Unbound (Game Edit)",148,,,,],
  "9a75cbb5-f9ad-4557-b3ed-5553a16023d7":[7.4,"SK","Agnostic",146,,,,],
  "fe111534-c651-4896-9538-2dd100131a7d":[7.3,"SK","夜風",140,,,,],
  "b87796c3-a64e-4cfd-a57f-a35484a951e2":[7.3,"SK","WATER",148,,,,],
  "9a8d5198-664a-418a-868b-b28d992c9b9e":[7.3,"SK","Psyched Fevereiro",139,,,,],
  "9476c969-d02d-40ca-b64f-eb3efae43ee7":[7.0,"SK","烁雨",144,,,,],
  "eb7a9055-b56f-46ba-9c30-0f9380d2f5b5":[6.9,"SK","Threat - Sky Islands",118,,,,],
  "1ec80826-e11e-43af-acd3-c154212443b9":[6.6,"SK","仮想明日",115,,,,],
  "9953eae4-4f60-4cfe-a8c3-9ada13a4b1ca":[6.5,"SK","雨女",117,,,,],
  "508fff6a-32dc-4f6b-88c7-bbd86e639085":[6.5,"SK","Fly To Meteor (Milthm Edit)",128,,,,],
  "296e3be3-1bdc-4568-a9d2-33ce9e0da9d4":[6.5,"SK","Words",122,,,,],
  "5aac139b-ab96-486d-a081-6bfebe382932":[6.5,"SK","Dogbite",117,,,,],
  "f28a654d-a2c4-4ff2-88f0-592ba52cd4fd":[6.5,"SK","白虎蓮華",128,,,,],
  "81daeec2-c1ae-4218-97fa-f9796504dba9":[6.4,"SK","参宿四~Betelgeuse~",120,,,,],
  "7d5df9f6-080f-4da0-974a-d2b8cb86e7e6":[6.3,"SK","Moving on",121,,,,],
  "8f75c6ff-a5ac-4738-b5e9-2549fa838084":[6.0,"SK","Aconsma",124,,,,],
  "8e72dab7-e72f-4842-a499-559659279e2c":[5.5,"SK","Threat - Superstructure",107,,,,],
  "37a9f1a0-32d4-4f78-acae-1be9ca7ea42f":[5.5,"SK","INFP.mp3",96,,,,],
  "54ea2f8f-ae05-4aba-a117-8d187bf08074":[4.5,"SK","时落之雨",84,,,,],
  "62c1cdc7-57c2-4a5f-809b-bcfb6c6a0469":[4.0,"SK","粗线条的雨",73,,,,],
  "acdab435-5aa3-45de-a815-9dbb7cd13130":[4.0,"SK","雨之城",84,,,,],
  "7c30226f-0ea5-4b71-aab7-7fefca1070dd":[4.5,"SK","Broken Conviction",82,,,,],
  "4144b702-77bd-4ff4-9ba0-aa7c70b2bab5":[4.5,"DZ","Regnaissance",80,,,,],
  "ac138fef-ad0b-4d0d-883c-453e6fe11d37":[4.0,"DZ","Contrasty Angeles",79,,,,],
  "cea79b8c-23fd-4fbd-b2a9-6f080ef15b44":[4.0,"DZ","cybernetic blazar",79,,,,],
  "2d6e3256-818b-434e-9980-ee6fcf14a8c7":[4.0,"DZ","☹",77,,,,],
  "5d23aa36-a3df-406f-980f-b6cd0cec5385":[3.5,"DZ","仮想明日",63,,,,],
  "2484331f-4345-4f97-98ac-edda4be3f723":[3.5,"DZ","Psyched Fevereiro",59,,,,],
  "5ab2ddde-5f3e-42ec-b626-1296680093d1":[3.5,"DZ","ネオン色のまち feat.Mai",64,,,,],
  "375f0d93-82e2-4350-9b46-98c3dd836305":[3.0,"DZ","雨女",55,,,,],
  "a8f6451b-eeb3-4cb4-898b-4a8c4233567f":[3.0,"DZ","Oniichan",65,,,,],
  "794c0460-7a5e-4ffb-bfcc-2800f1d5bfb2":[3.0,"DZ","Moonflutter",58,,,,],
  "520361a1-805b-4332-b53e-1da11a94de1b":[3.0,"DZ","イコラト",57,,,,],
  "dd163ba4-a1fa-4fc7-ba45-91561c824cc8":[3.0,"DZ","命日",52,,,,],
  "74bf4e17-c246-4871-9b2b-0dd0d0e6ee28":[3.0,"DZ","Agnostic",56,,,,],
  "d83fd3e1-a609-4b73-b1f1-348ee1dca71d":[3.0,"DZ","夜風",60,,,,],
  "8442e9aa-ea0a-4d9e-8592-cfd9228eb14c":[3.0,"DZ","樱落繁花",67,,,,],
  "1ab3b5cf-b6af-48ec-99e8-2d3a4e9edc72":[3.0,"DZ","Hikari",65,,,,],
  "c6629820-510f-4575-969e-dc6a9d3fe479":[3.0,"DZ","WATER",60,,,,],
  "adcc6c11-2986-4f3c-ae7e-4b52fe75dc83":[3.0,"DZ","Fly To Meteor (Milthm Edit)",61,,,,],
  "75fbb0ef-08fa-47cb-8c6f-acf361f7a081":[3.0,"DZ","Future Unbound (Game Edit)",64,,,,],
  "d8074d7e-dc36-4190-9377-0c62c3775dac":[3.0,"DZ","Dogbite",64,,,,],
  "cfa1c1fd-432e-4313-ae23-fbd6f731ae46":[3.0,"DZ","白虎蓮華",66,,,,],
  "6eac0020-b9a1-480e-9539-633c0e502f9c":[3.0,"DZ","slic.hertz #GdbG",60,,,,],
  "e27a66da-19c5-4d3a-85f4-5defdf5b7b88":[2.0,"DZ","Elsorhg",33,,,,],
  "c55ac81b-f00d-4031-8f54-a7735ce84cd3":[2.0,"DZ","Meltovt Necrosys",49,,,,],
  "5b104c2e-94ad-4156-ab25-d1b11be487f3":[2.0,"DZ","Rainbow Flavor!",25,,,,],
  "0af38afb-fe05-403c-90b6-2876bb18616e":[2.0,"DZ","Threat - Sky Islands",47,,,,],
  "6d4c9a21-2ed4-4892-9b38-fd53840de04f":[2.0,"DZ","Moving on",40,,,,],
  "e09a8896-ad87-4cee-8f2a-40b8d4439f26":[2.0,"DZ","Algebra",46,,,,],
  "a5000e56-b917-40ce-9ebb-12cc2c4a2e70":[2.0,"DZ","Fragment of Memories",49,,,,],
  "98913dff-7257-44aa-a0f2-abcd58d11fcd":[2.0,"DZ","Threat - Superstructure",40,,,,],
  "c5032ab4-c03c-42c3-b132-445b94165e8d":[2.0,"DZ","OverRain",43,,,,],
  "b75e195e-7991-4e4a-8afc-7372b4ae95fd":[2.0,"DZ","暮予星光",41,,,,],
  "a4ac4167-5934-4157-90e7-675c994b4451":[2.0,"DZ","参宿四~Betelgeuse~",32,,,,],
  "eceaaf9e-3754-4054-9c17-2d87644de96e":[2.0,"DZ","烁雨",40,,,,],
  "8c794275-de29-4beb-87a1-af024fe94e1e":[2.0,"DZ","花月",83,,,,],
  "3ebe1bbe-5d13-4175-ad91-dcf85c7bfd19":[2.0,"DZ","INFP.mp3",40,,,,],
  "7072a099-a482-484d-84a5-945ac94807e1":[2.0,"DZ","Innocent white",36,,,,],
  "9884d239-3007-4e78-a655-297f000bcf50":[2.0,"DZ","Words",34,,,,],
  "213a40e1-d945-464c-aa6e-9ae82db8fc50":[2.0,"DZ","Jump out?",37,,,,],
  "a5ba0b3b-1eb5-4b43-8d12-9e82b6d0afaa":[2.0,"DZ","Bio-Engineering",33,,,,],
  "e7cd8b7f-a19c-488d-b9b6-127524586ed3":[1.0,"DZ","IN",46,,,,],
  "8b329704-9ce5-4361-abd5-b89c68b61286":[1.0,"DZ","Aconsma",16,,,,],
  "68fbf0eb-f43a-4497-afb1-8282176aed97":[1.0,"DZ","HYPER MEMORIES",63,,,,],
  "64cc8f3b-7bed-48a3-80ca-f281c57c0916":[1.0,"DZ","时落之雨",17,,,,],
  "7687d948-dbe1-48c4-a786-fbe669ec7b0c":[1.0,"DZ","粗线条的雨",13,,,,],
  "e69b4e77-ccb2-4694-ba88-7209ed097783":[1.0,"DZ","雨之城",26,,,,],
  "606be389-ad01-41e3-a1ba-e7b355d16948":[1.0,"DZ","Sundown",14,,,,],
  "364be32e-f685-4efb-80b5-64281c93939d":[1.0,"DZ","Welcome to Milthm",11,,,,],
  "4fa17ebf-6a8e-47c1-8d8b-bd1344ccd559":[1.0,"DZ","サイクルの欠片",20,,,,],
  "6a647130-01de-4cf2-ba7a-a6065f043465":[4.0,"SK","White Lizard",83,,,,],
  "c1d143f6-ad6b-46cc-b3e0-f136e4accb01":[10.6,"CB","Threat - Waterfront Complex",34,,,,],
  "9c28aeec-247e-4b9d-9edc-a92d0bd06303":[7.6,"SK","Threat - Waterfront Complex",131,,,,],
  "2103d16c-9a07-4001-be01-155ef305118e":[2.0,"DZ","Threat - Waterfront Complex",198,,,,],
  "1a3167ae-9105-4545-9aa7-3cab60874e9c":[10.4,"CB","Kayava",205,,,,],
  "1ae6231b-d165-4f09-a138-9ec0d29431a7":[5.5,"SK","Kayava",101,,,,],
  "85a6566f-d9df-408e-a812-0b13a80362cc":[3.0,"DZ","Kayava",60,,,,],
  "abefe6c9-2b30-45ef-b5b0-8edb5fc18195":[11.5,"CB","Threat - Metropolis",211,,,,],
  "975a9b31-3f04-4587-b77e-2282dec95188":[6.6,"SK","Threat - Metropolis",120,,,,],
  "c292f47e-d8ff-483f-bfd7-aa43937f0e2e":[2.0,"DZ","Threat - Metropolis",39,,,,],
  "6add3ab9-52c0-4c13-abc9-506dfa89faa6":[11.1,"CB","Sheer Ice Torrent",333,,,,],
  "d3ddf678-adb0-4157-ae10-21c2667c7ba8":[7.8,"SK","Sheer Ice Torrent",333,,,,],
  "e23637e8-fe15-4d9a-b3c9-9e059745ad3c":[2.0,"DZ","Sheer Ice Torrent",333,,,,],
  "a8d6dfa7-b879-4eef-a10a-dbbd46519583":[12.2,"CB","大月墜落狂想",231,3,2,2,2],
  "9eb53fd3-a91c-45c6-8608-f3a76eecf9f7":[8.0,"SK","大月墜落狂想",157,,,,],
  "ca751a94-f71e-4556-9d54-76de325ca29c":[2.0,"DZ","大月墜落狂想",37,,,,],
  "addba2e9-ad45-4770-b850-717ab2e0e17d":[10.6,"CB","FULi AUTO SHOOTER",192,,,,],
  "423e7ae7-97e9-4c87-a778-36af2020a59d":[7.2,"SK","FULi AUTO SHOOTER",145,,,,],
  "d93cfe14-d3b1-4934-98a4-77b89e1f1304":[3.0,"DZ","FULi AUTO SHOOTER",65,,,,],
  "825405cb-d262-4f10-9e98-4d967e4e33f4":[11.3,"CB","cafe in 6412I731V",211,,,,],
  "faf0dc82-df37-456a-b726-283e27df9c31":[7.0,"SK","cafe in 6412I731V",133,,,,],
  "54c60c83-9a80-458d-bf11-b04be1af1977":[2.0,"DZ","cafe in 6412I731V",49,,,,],
  "5c0778d6-b2db-444f-a911-7892ffdf3ba5":[11.6,"CB","KASANE",223,,,,],
  "3b11fea9-a2e3-40f7-bbe2-196cfcf25a1c":[7.8,"SK","KASANE",145,,,,],
  "76aebcf6-d55d-4490-b48a-1fc3162a974a":[3.0,"DZ","KASANE",53,,,,],
  "bab866eb-1919-4133-9ea5-0d780e17aa48":[10.4,"CB","Fantasia Sonata Stars",,,,,],
  "fa7c3e3f-29c3-4a27-a656-7696cbcd975e":[6.8,"SK","Fantasia Sonata Stars",,,,,],
  "c4670dbb-6bad-4ae5-baef-4f2400b3ba41":[2.0,"DZ","Fantasia Sonata Stars",,,,,],
  "4e844cd0-d532-486a-bf46-3fcf77dc3914":[10.5,"CB","Fantasia Sonata Sky Syndrome",,,,,],
  "9a53b7e0-fc48-4203-ace2-872a12fe7ec4":[7.0,"SK","Fantasia Sonata Sky Syndrome",,,,,],
  "dd3934f9-5a39-4086-b859-03c164db27ef":[2.5,"DZ","Fantasia Sonata Sky Syndrome",,,,,],
  "cdb92390-bb3e-4ec7-bfbd-764c57345058":[10.1,"CB","はんてん",,,,,],
  "97573233-f735-4432-ad7c-745367c11ffc":[6.0,"SK","はんてん",,,,,],
  "738d7d56-9716-4cf1-8bb4-a54e31c6df61":[2.0,"DZ","はんてん",,,,,],
  "5f5490a8-f2e2-4ab6-9800-1db6f3eed344":[10.4,"CB","Curse of 14",,,,,],
  "df7a7116-1299-4557-8be4-36603a8da40e":[7.5,"SK","Curse of 14",,,,,],
  "7b603362-5888-41d1-953b-0e4a7e461b79":[3.0,"DZ","Curse of 14",,,,,],
  "e9ae00a5-355c-45ff-b099-91cd5455193c":[10.6,"CB","Virtual S0da",,,,,],
  "5d4a26e7-8810-4a97-87b8-26dd3876463f":[6.6,"SK","Virtual S0da",,,,,],
  "e9789bd9-bc33-412c-a1c9-d00ded16b324":[3.0,"DZ","Virtual S0da",,,,,],
  "575ea000-3a9e-4c68-b20e-73a16b4f044d":[10.6,"CB","apOapSis(Edit)",,,,,],
  "bf05f32a-9a94-4915-b91c-877a0e7c99a4":[6.4,"SK","apOapSis(Edit)",,,,,],
  "433e8313-04b8-4abc-aaf0-d4d102bb7f24":[3.5,"DZ","apOapSis(Edit)",,,,,],
  "eb802d90-72c0-4b95-856a-b2951a57c0ec":[-1,"CB*","Sheer Ice Torrent",,,,,],
  "d3ddf678-adb0-4158-ae10-21c2667c7ba8":[-1,"SK*","Sheer Ice Torrent",,,,,],
  "e23637e8-fe16-4d9a-b3c9-9e059745ad3c":[-1,"DZ*","Sheer Ice Torrent",,,,,],
  "eade667e-610b-419c-bc3d-503d7946d1ea":[-1,"SP","Welcome to Milthm",,,,,],
  "1ccef645-09b6-400d-a438-b2f2fdc0debc":[-1,"SP","选择你的宽带",,,,,],
  "cc508ca6-5d5f-4222-a4a9-3a8cfbaac03e":[-1,"SP","Algebra",,,,,],
  "242edead-e9cd-428d-9799-f8a603109fc6":[-1,"SP","Rainbow Flavor!",,,,,],
  "9bccf0ee-58d6-41cc-8885-2ab1ba25cc2a":[-1,"SP","KAEDE",,,,,],
};

//解析出constant
const constants={}, fields=["constant","category","name","yct","ad","ae","af","ag"];
for(const id in constantsData){
  const arr=constantsData[id], obj={};
  fields.forEach((k,i)=>{
    let v=arr[i];
    if(v===undefined){
      if(k==="ad")v=0;
      else if(k==="ae"||k==="af")v=1;
      else if(k==="ag")v=0;
    }
    if(v!==undefined)obj[k]=v;
  });
  constants[id]=obj;
}

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
    // 根据目标值选择搜索区间
    if (target <= constant-1.5) return 700000;
    if (target > 1 + constant) return "Unable to deduce points"; 
    if (target == (1 + constant)) return 1005000;
    // 根据目标值确定在哪个分段进行查找
    if (target > 0.3 + constant) {
return Math.min(Math.ceil(10000 * (99.5 + Math.log((1.4 / (target + 0.4 - constant)) - 1) / -3.65)),1005000 );
    } else if (target > -0.5 + constant) {
        return Math.ceil(980000 + 15000 * (Math.log(((target + 0.5 - constant) / 0.8) * (Math.exp(3.1) - 1) + 1) / 3.1));
    } else {
        return Math.ceil((target-constant+4)*280000);
    }
    return 114514;
}

/* ========== 核心流程 ========== */
function processData() {
    const inputData = document.getElementById('inputData').value.replace(/\n/g, '').replace(/  /g, '');
    const format = /^\[.*\],\{.*\}$/.test(inputData) ? 'new' : 'old';
const { username, items } = (format === 'new' 
  ? (() => {
      const [, username, songDataStr] = inputData.match(/^\[(.*?)\],\{(.*)\}$/);
      const songData = songDataStr.split('],[');
      return { username, items: songData.map(processSong) };
    })() 
  : (() => {
      const start = inputData.indexOf('{"UserName":');
      const end = inputData.indexOf('}]}') + 3;
      const str = inputData.slice(start, end);
      const parsed = tryParseJSON(str);
      if (!(parsed && parsed.SongRecords)) {
        alert_invalid();
        return { username: "", items: [] };
      }
      return { username: parsed.UserName, items: parsed.SongRecords.map(processSongFromOldFormat).filter(Boolean) };
    })());

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
          window.data=extracted;
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



/* ========== 显示用户信息 ========== */
function drawUserInfo(username, results) {
  const userInfoDiv = document.getElementById('userInfo');
  const usercontainer = document.getElementById('usercontainer');
  usercontainer.style.display = 'block';
  const avg = (results.filter(item => item.singleRealityRaw > 0)
  .slice(0, 20)
  .reduce((acc, item) => acc + item.singleRealityRaw, 0) / 20).toFixed(4) || '0.0000';
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
      ctx.fillText(Updated, 100, 210);
      const items = [...window.processedItems.slice(0, actualCardCount), ...window.norlt];
      Promise.all(items.map(i => Promise.all([
        loadImage(`./jpgs/${encodeURIComponent(i.name.replace(/[#?]/g, ''))}.jpg`).catch(() => loadImage('./jpgs/NYA.jpg')),
        loadImage(`./jpgs/${i.bestLevel}.png`).catch(() => null)
      ]))).then(imgs => drawCards(ctx, canvas, items, imgs));
      
    });
}
function drawCards(ctx, canvas, items, images) {
  // 固定尺寸常量（= 基础尺寸 × 1.3）
  const cardW = 442, cardH = 130, imgW = 185, imgH = 104, icon = 91;
  const x0 = 110, y0 = 350, col = 520, row = 162.5;

  items.forEach((it, i) => {
    const x = x0 + (i % 2) * col,
          y = y0 + Math.floor(i / 2) * row - (i % 2 ? 0 : 50);

    // 卡底
    ctx.fillStyle = 'rgba(128,128,128,.4)';
    ctx.fillRect(x, y, cardW, cardH);

    // 排名号
    ctx.font = '17px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = i < 20 ? '#FAFAFA' : '#C9C9C9';
    ctx.fillText(`#${i + 1}`, x + cardW - 10, y + 7);

    // 分数（含渐变颜色）
    const scoreStr = it.bestScore.toString().padStart(7, '0');
    let scoreClr =
      it.bestLevel < 2
        ? (() => {
            const g = ctx.createLinearGradient(x, y + 52, x, y + 91);
            g.addColorStop(0, '#99C5FB');
            g.addColorStop(1, '#D8C3FA');
            return g;
          })()
        : it.bestLevel === 2
        ? '#90CAEF'
        : '#FFFFFF';

    ctx.font = '39px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = scoreClr;
    ctx.fillText(scoreStr, x + 208, y + 52);

    // 歌名（自动缩字）
    let f = 25;
    ctx.font = `${f}px Arial`;
    while (ctx.measureText(it.name).width > 200 && f > 10) {
      ctx.font = `${--f}px Arial`;
    }
    ctx.fillStyle = '#FFF';
    ctx.fillText(it.name, x + 212, y + 23);

    // 评级 / 常数 / 准确率 行
    ctx.font = '20px Arial';
    const acc = `${(it.bestAccuracy * 100).toFixed(2)}%`;
    if (document.getElementById('yrjds').value === 'true') {
      ctx.fillText(
        `${it.category} ${it.yct || it.constant} > ${(it.singleRealityRaw * 20).toFixed(1)}   ${acc}`,
        x + 208,
        y + 98
      );
    } else {
      ctx.fillText(
        `${it.category} ${parseFloat(it.constant).toFixed(1)} > ${it.singleReality}   ${acc}`,
        x + 208,
        y + 98
      );
    }

    // 目标分
    ctx.font = '13px Arial';
    ctx.fillText(
      `>>${findScore(
        it.constant,
        Math.ceil(window.average * 100 - 0.5) + 0.5 !== window.average * 100
          ? (Math.ceil(window.average * 100 - 0.5) + 0.5 - window.average * 100) / 5 + Math.max(it.singleRealityRaw,items?.[19]?.singleRealityRaw ?? 0)
          : 114514
      )}`,
      x + 212,
      y + 86
    );

    // 封面与段位图
    ctx.drawImage(images[i][0], x + 13, y + 13, imgW, imgH);
    if (images[i][1]) ctx.drawImage(images[i][1], x + 351, y + 26, icon, icon);
  });

  exportImage(canvas);
}

function exportImage(canvas) {
  const input = document.getElementById('inputData').value,
        data = 'userdata:' + (window.data || input),
        imgBase64 = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''),
        imgBin = atob(imgBase64),
        txtBytes = new TextEncoder().encode(data),
        len = imgBin.length + txtBytes.length,
        buf = new Uint8Array(len);

  for (let i = 0; i < imgBin.length; i++) buf[i] = imgBin.charCodeAt(i);
  buf.set(txtBytes, imgBin.length);

  const blob = new Blob([buf], { type: 'image/png' }),
        link = document.createElement('a'),
        t = new Date().toISOString().replace(/[:\-T]/g, '_').split('.')[0];
  link.download = `output_${t}.png`;
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