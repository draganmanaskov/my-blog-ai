const daisyuiThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter"
];

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export let themes = daisyuiThemes.map(item => ({ name: capitalizeFirstLetter(item), value: item }));
themes.push({ name: "System", value: "system" });

// export const themes = [
//     {
//       name: "Light",
//       value: "light",
//     },
//     {
//       name: "Dark",
//       value: "dark",
//     },
//     {
//       name: "Aqua",
//       value: "aqua",
//     },
//     {
//       name: "Halloween",
//       value: "halloween",
//     },
//     {
//       name: "System",
//       value: "system",
//     },
//   ];


//   const themes = [
//     {
//       name: "Light",
//       value: "light",
//       icon: <Icons.Sun className="w-4 h-4 mr-2" />,
//     },
//     {
//       name: "Dark",
//       value: "dark",
//       icon: <Icons.Moon className="w-4 h-4 mr-2" />,
//     },
//     {
//       name: "Aqua",
//       value: "aqua",
//       icon: <Icons.Sun className="w-4 h-4 mr-2" />,
//     },
//     {
//       name: "Halloween",
//       value: "halloween",
//       icon: <Icons.Sun className="w-4 h-4 mr-2" />,
//     },
//     {
//       name: "System",
//       value: "system",
//       icon: <Icons.Laptop className="w-4 h-4 mr-2" />,
//     },
//   ];
  