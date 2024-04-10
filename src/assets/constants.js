import { TbWorld } from "react-icons/tb";
import { VscHome } from "react-icons/vsc";
import { RiBarChartGroupedFill } from "react-icons/ri";
import { BiGroup } from "react-icons/bi";


export const genres = [
    { title: 'Alternative', value: '1402845615' },
    { title: 'Classical', value: '747148961' },
    { title: 'Country', value: '1130102843' },
    { title: 'Dance', value: '2113355604' },
    { title: 'Electronic', value: '2143562442' },
    { title: 'Film', value: '11275827384' },
    { title: 'Hip-Hop', value: '1996494362' },
    { title: 'House', value: '1947984342' },
    { title: 'Indie', value: '735488796' },
    { title: 'J-Pop', value: '6049895724' },
    { title: 'J-Rock', value: '6055749804' },
    { title: 'Jazz', value: '1615514485' },
    { title: 'K-Pop', value: '12244134951' },
    { title: 'Latin', value: '178699142' },
    { title: 'Pop', value: '1963962142' },
    { title: 'R&B', value: '1999466402' },
    { title: 'Reggae', value: '2448918882' },
    { title: 'Rock', value: '1514808481' },
    { title: 'Soul', value: '1257789321' },
    { title: 'Worldwide', value: '3155776842' },
];  

//has to apply to app.jsx
export const links = [
  { name: 'Discover', to: '/', icon: VscHome },
  { name: 'Around You', to: '/around-you', icon: TbWorld },
  { name: 'Top Artists', to: '/top-artists', icon: BiGroup },
  { name: 'Top Charts', to: '/top-charts', icon: RiBarChartGroupedFill },
];
