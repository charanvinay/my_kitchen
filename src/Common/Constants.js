import { createTheme } from "@mui/material";
import { bgSecondary, primary } from "./Pallete";
import BadgeIcon from "@mui/icons-material/Badge";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
export const colourStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = primary;
    return {
      ...styles,
      fontSize: "14px",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? bgSecondary
        : isFocused
        ? bgSecondary
        : undefined,
      color: isDisabled ? "#ccc" : isSelected ? bgSecondary : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        color: "#fff",
        backgroundColor: color,
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: primary,
      color: "#fff",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#fff",
  }),

  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data,
    opacity: 0.7,
    ":hover": {
      backgroundColor: data,
      color: "white",
      opacity: 1,
    },
  }),
};

export const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: "#ffa500",
    },
  },
  typography: {
    subtitle1: {
      fontSize: "14px",
      letterSpacing: 0.5,
      fontWeight: "500",
    },
    subtitle2: {
      fontSize: "14px",
    },
    body1: {
      fontSize: "16px",
      letterSpacing: 0.4,
    },
    h1: {
      fontSize: "18px",
      fontWeight: "bold",
      letterSpacing: 0.5,
    },
  },
  components: {
    FormControlLabel: {
      root: {
        fontWeight: "400",
        color: "#ff0000",
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "text" },
          style: {
            fontWeight: "600",
            letterSpacing: 0.7,
            fontSize: "14px",
            textTransform: "none",
          },
        },
        {
          props: { variant: "contained" },
          style: {
            textTransform: "none",
            fontSize: "15px",
            letterSpacing: 0.5,
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            textTransform: "none",
            fontSize: "15px",
            letterSpacing: 0.5,
          },
        },
      ],
    },
    MuiChip: {
      styles: {
        fontSize: "20px",
      },
    },
  },
});

export const Skills = [
  {
    value: ".NET Development",
    label: ".NET Development",
  },
  {
    value: "Android App Development",
    label: "Android App Development",
  },
  {
    value: "Angular.js Development",
    label: "Angular.js Development",
  },
  {
    value: "Artificial Intelligence (AI)",
    label: "Artificial Intelligence (AI)",
  },
  {
    value: "Backend Development",
    label: "Backend Development",
  },
  {
    value: "Blockchain Development",
    label: "Blockchain Development",
  },
  {
    value: "CAD Design",
    label: "CAD Design",
  },
  {
    value: "Campus Ambassador",
    label: "Campus Ambassador",
  },
  {
    value: "Cloud Computing",
    label: "Cloud Computing",
  },
  {
    value: "Computer Vision",
    label: "Computer Vision",
  },
  {
    value: "Content Writing",
    label: "Content Writing",
  },
  {
    value: "Data Science",
    label: "Data Science",
  },
  {
    value: "Digital Marketing",
    label: "Digital Marketing",
  },
  {
    value: "Embedded Systems",
    label: "Embedded Systems",
  },
  {
    value: "Flutter Development",
    label: "Flutter Development",
  },
  {
    value: "Front End Development",
    label: "Front End Development",
  },
  {
    value: "Full Stack Development",
    label: "Full Stack Development",
  },
  {
    value: "Game Development",
    label: "Game Development",
  },
  {
    value: "Graphic Design",
    label: "Graphic Design",
  },
  {
    value: "Human Resources (HR)",
    label: "Human Resources (HR)",
  },
  {
    value: "Industrial Design",
    label: "Industrial Design",
  },
  {
    value: "Internet of Things (IoT)",
    label: "Internet of Things (IoT)",
  },
  {
    value: "Java Development",
    label: "Java Development",
  },
  {
    value: "Javascript Development",
    label: "Javascript Development",
  },
  {
    value: "Machine Learning",
    label: "Machine Learning",
  },
  {
    value: "Mechatronics",
    label: "Mechatronics",
  },
  {
    value: "Mobile App Development",
    label: "Mobile App Development",
  },
  {
    value: "Node.js Development",
    label: "Node.js Development",
  },
  {
    value: "PHP Development",
    label: "PHP Development",
  },
  {
    value: "Product Management",
    label: "Product Management",
  },
  {
    value: "Programming",
    label: "Programming",
  },
  {
    value: "Python/Django Development",
    label: "Python/Django Development",
  },
  { value: "Robotics", label: "Robotics" },
  {
    value: "Search Engine Optimization (SEO)",
    label: "Search Engine Optimization (SEO)",
  },
  {
    value: "Social Media Marketing",
    label: "Social Media Marketing",
  },
  {
    value: "Software Development",
    label: "Software Development",
  },
  {
    value: "Software Testing",
    label: "Software Testing",
  },
  {
    value: "Statistics",
    label: "Statistics",
  },
  {
    value: "UI/UX Design",
    label: "UI/UX Design",
  },
  {
    value: "Volunteering",
    label: "Volunteering",
  },
  {
    value: "Web Development",
    label: "Web Development",
  },
  {
    value: "Wordpress Development",
    label: "Wordpress Development",
  },
];

export const companies = [
  { id: 1, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 2, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 3, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 4, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  {
    id: 5,
    url: "https://profoundedutech.com/blog/wp-content/uploads/2020/11/Wipro_Logo_New.png",
  },
  { id: 6, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 7, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 8, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  {
    id: 9,
    url: "https://profoundedutech.com/blog/wp-content/uploads/2020/11/Wipro_Logo_New.png",
  },
  { id: 10, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 11, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  {
    id: 12,
    url: "https://profoundedutech.com/blog/wp-content/uploads/2020/11/Wipro_Logo_New.png",
  },
  { id: 13, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 14, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  {
    id: 15,
    url: "https://profoundedutech.com/blog/wp-content/uploads/2020/11/Wipro_Logo_New.png",
  },
  { id: 16, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 17, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  {
    id: 18,
    url: "https://profoundedutech.com/blog/wp-content/uploads/2020/11/Wipro_Logo_New.png",
  },
  { id: 19, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  { id: 20, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  {
    id: 21,
    url: "https://profoundedutech.com/blog/wp-content/uploads/2020/11/Wipro_Logo_New.png",
  },
  { id: 22, url: "https://pngimg.com/uploads/amazon/amazon_PNG5.png" },
  {
    id: 23,
    url: "https://profoundedutech.com/blog/wp-content/uploads/2020/11/Wipro_Logo_New.png",
  },
];

export const placements = [
  {
    id: 1,
    color: "#227694",
    title: "Students placed",
    icon: <BadgeIcon sx={{ margin: "0px", color: "#fff", fontSize: "40px" }} />,
  },
  {
    id: 2,
    color: "#6D49FF",
    title: "Companies recruited",
    icon: (
      <CorporateFareOutlinedIcon
        sx={{ margin: "0px", color: "#fff", fontSize: "40px" }}
      />
    ),
  },
  {
    id: 3,
    color: "#62BA27",
    title: "Placement percentage",
    icon: (
      <HowToRegOutlinedIcon
        sx={{ margin: "0px", color: "#fff", fontSize: "40px" }}
      />
    ),
  },
];

export const countries = [
  { label: "Andorra", phone: "376" },
  {
    label: "United Arab Emirates",
    phone: "971",
  },
  { label: "Afghanistan", phone: "93" },
  {
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { label: "Anguilla", phone: "1-264" },
  { label: "Albania", phone: "355" },
  { label: "Armenia", phone: "374" },
  { label: "Angola", phone: "244" },
  { label: "Antarctica", phone: "672" },
  { label: "Argentina", phone: "54" },
  { label: "American Samoa", phone: "1-684" },
  { label: "Austria", phone: "43" },
  {
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { label: "Aruba", phone: "297" },
  { label: "Alland Islands", phone: "358" },
  { label: "Azerbaijan", phone: "994" },
  {
    label: "Bosnia and Herzegovina",
    phone: "387",
  },
  { label: "Barbados", phone: "1-246" },
  { label: "Bangladesh", phone: "880" },
  { label: "Belgium", phone: "32" },
  { label: "Burkina Faso", phone: "226" },
  { label: "Bulgaria", phone: "359" },
  { label: "Bahrain", phone: "973" },
  { label: "Burundi", phone: "257" },
  { label: "Benin", phone: "229" },
  { label: "Saint Barthelemy", phone: "590" },
  { label: "Bermuda", phone: "1-441" },
  { label: "Brunei Darussalam", phone: "673" },
  { label: "Bolivia", phone: "591" },
  { label: "Brazil", phone: "55" },
  { label: "Bahamas", phone: "1-242" },
  { label: "Bhutan", phone: "975" },
  { label: "Bouvet Island", phone: "47" },
  { label: "Botswana", phone: "267" },
  { label: "Belarus", phone: "375" },
  { label: "Belize", phone: "501" },
  {
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    label: "Cocos (Keeling) Islands",
    phone: "61",
  },
  {
    label: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    label: "Central African Republic",
    phone: "236",
  },
  {
    label: "Congo, Republic of the",
    phone: "242",
  },
  { label: "Switzerland", phone: "41" },
  { label: "Cote d'Ivoire", phone: "225" },
  { label: "Cook Islands", phone: "682" },
  { label: "Chile", phone: "56" },
  { label: "Cameroon", phone: "237" },
  { label: "China", phone: "86" },
  { label: "Colombia", phone: "57" },
  { label: "Costa Rica", phone: "506" },
  { label: "Cuba", phone: "53" },
  { label: "Cape Verde", phone: "238" },
  { label: "Curacao", phone: "599" },
  { label: "Christmas Island", phone: "61" },
  { label: "Cyprus", phone: "357" },
  { label: "Czech Republic", phone: "420" },
  {
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { label: "Djibouti", phone: "253" },
  { label: "Denmark", phone: "45" },
  { label: "Dominica", phone: "1-767" },
  {
    label: "Dominican Republic",
    phone: "1-809",
  },
  { label: "Algeria", phone: "213" },
  { label: "Ecuador", phone: "593" },
  { label: "Estonia", phone: "372" },
  { label: "Egypt", phone: "20" },
  { label: "Western Sahara", phone: "212" },
  { label: "Eritrea", phone: "291" },
  { label: "Spain", phone: "34" },
  { label: "Ethiopia", phone: "251" },
  { label: "Finland", phone: "358" },
  { label: "Fiji", phone: "679" },
  {
    label: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    label: "Micronesia, Federated States of",
    phone: "691",
  },
  { label: "Faroe Islands", phone: "298" },
  {
    label: "France",
    phone: "33",
    suggested: true,
  },
  { label: "Gabon", phone: "241" },
  { label: "United Kingdom", phone: "44" },
  { label: "Grenada", phone: "1-473" },
  { label: "Georgia", phone: "995" },
  { label: "French Guiana", phone: "594" },
  { label: "Guernsey", phone: "44" },
  { label: "Ghana", phone: "233" },
  { label: "Gibraltar", phone: "350" },
  { label: "Greenland", phone: "299" },
  { label: "Gambia", phone: "220" },
  { label: "Guinea", phone: "224" },
  { label: "Guadeloupe", phone: "590" },
  { label: "Equatorial Guinea", phone: "240" },
  { label: "Greece", phone: "30" },
  {
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { label: "Guatemala", phone: "502" },
  { label: "Guam", phone: "1-671" },
  { label: "Guinea-Bissau", phone: "245" },
  { label: "Guyana", phone: "592" },
  { label: "Hong Kong", phone: "852" },
  {
    label: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { label: "Honduras", phone: "504" },
  { label: "Croatia", phone: "385" },
  { label: "Haiti", phone: "509" },
  { label: "Hungary", phone: "36" },
  { label: "Indonesia", phone: "62" },
  { label: "Ireland", phone: "353" },
  { label: "Israel", phone: "972" },
  { label: "Isle of Man", phone: "44" },
  { label: "India", phone: "91" },
  {
    label: "British Indian Ocean Territory",
    phone: "246",
  },
  { label: "Iraq", phone: "964" },
  {
    label: "Iran, Islamic Republic of",
    phone: "98",
  },
  { label: "Iceland", phone: "354" },
  { label: "Italy", phone: "39" },
  { label: "Jersey", phone: "44" },
  { label: "Jamaica", phone: "1-876" },
  { label: "Jordan", phone: "962" },
  {
    label: "Japan",
    phone: "81",
    suggested: true,
  },
  { label: "Kenya", phone: "254" },
  { label: "Kyrgyzstan", phone: "996" },
  { label: "Cambodia", phone: "855" },
  { label: "Kiribati", phone: "686" },
  { label: "Comoros", phone: "269" },
  {
    label: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    label: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { label: "Korea, Republic of", phone: "82" },
  { label: "Kuwait", phone: "965" },
  { label: "Cayman Islands", phone: "1-345" },
  { label: "Kazakhstan", phone: "7" },
  {
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { label: "Lebanon", phone: "961" },
  { label: "Saint Lucia", phone: "1-758" },
  { label: "Liechtenstein", phone: "423" },
  { label: "Sri Lanka", phone: "94" },
  { label: "Liberia", phone: "231" },
  { label: "Lesotho", phone: "266" },
  { label: "Lithuania", phone: "370" },
  { label: "Luxembourg", phone: "352" },
  { label: "Latvia", phone: "371" },
  { label: "Libya", phone: "218" },
  { label: "Morocco", phone: "212" },
  { label: "Monaco", phone: "377" },
  {
    label: "Moldova, Republic of",
    phone: "373",
  },
  { label: "Montenegro", phone: "382" },
  {
    label: "Saint Martin (French part)",
    phone: "590",
  },
  { label: "Madagascar", phone: "261" },
  { label: "Marshall Islands", phone: "692" },
  {
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { label: "Mali", phone: "223" },
  { label: "Myanmar", phone: "95" },
  { label: "Mongolia", phone: "976" },
  { label: "Macao", phone: "853" },
  {
    label: "Northern Mariana Islands",
    phone: "1-670",
  },
  { label: "Martinique", phone: "596" },
  { label: "Mauritania", phone: "222" },
  { label: "Montserrat", phone: "1-664" },
  { label: "Malta", phone: "356" },
  { label: "Mauritius", phone: "230" },
  { label: "Maldives", phone: "960" },
  { label: "Malawi", phone: "265" },
  { label: "Mexico", phone: "52" },
  { label: "Malaysia", phone: "60" },
  { label: "Mozambique", phone: "258" },
  { label: "Namibia", phone: "264" },
  { label: "New Caledonia", phone: "687" },
  { label: "Niger", phone: "227" },
  { label: "Norfolk Island", phone: "672" },
  { label: "Nigeria", phone: "234" },
  { label: "Nicaragua", phone: "505" },
  { label: "Netherlands", phone: "31" },
  { label: "Norway", phone: "47" },
  { label: "Nepal", phone: "977" },
  { label: "Nauru", phone: "674" },
  { label: "Niue", phone: "683" },
  { label: "New Zealand", phone: "64" },
  { label: "Oman", phone: "968" },
  { label: "Panama", phone: "507" },
  { label: "Peru", phone: "51" },
  { label: "French Polynesia", phone: "689" },
  { label: "Papua New Guinea", phone: "675" },
  { label: "Philippines", phone: "63" },
  { label: "Pakistan", phone: "92" },
  { label: "Poland", phone: "48" },
  {
    label: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { label: "Pitcairn", phone: "870" },
  { label: "Puerto Rico", phone: "1" },
  {
    label: "Palestine, State of",
    phone: "970",
  },
  { label: "Portugal", phone: "351" },
  { label: "Palau", phone: "680" },
  { label: "Paraguay", phone: "595" },
  { label: "Qatar", phone: "974" },
  { label: "Reunion", phone: "262" },
  { label: "Romania", phone: "40" },
  { label: "Serbia", phone: "381" },
  { label: "Russian Federation", phone: "7" },
  { label: "Rwanda", phone: "250" },
  { label: "Saudi Arabia", phone: "966" },
  { label: "Solomon Islands", phone: "677" },
  { label: "Seychelles", phone: "248" },
  { label: "Sudan", phone: "249" },
  { label: "Sweden", phone: "46" },
  { label: "Singapore", phone: "65" },
  { label: "Saint Helena", phone: "290" },
  { label: "Slovenia", phone: "386" },
  {
    label: "Svalbard and Jan Mayen",
    phone: "47",
  },
  { label: "Slovakia", phone: "421" },
  { label: "Sierra Leone", phone: "232" },
  { label: "San Marino", phone: "378" },
  { label: "Senegal", phone: "221" },
  { label: "Somalia", phone: "252" },
  { label: "Suriname", phone: "597" },
  { label: "South Sudan", phone: "211" },
  {
    label: "Sao Tome and Principe",
    phone: "239",
  },
  { label: "El Salvador", phone: "503" },
  {
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  {
    label: "Syrian Arab Republic",
    phone: "963",
  },
  { label: "Swaziland", phone: "268" },
  {
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { label: "Chad", phone: "235" },
  {
    label: "French Southern Territories",
    phone: "262",
  },
  { label: "Togo", phone: "228" },
  { label: "Thailand", phone: "66" },
  { label: "Tajikistan", phone: "992" },
  { label: "Tokelau", phone: "690" },
  { label: "Timor-Leste", phone: "670" },
  { label: "Turkmenistan", phone: "993" },
  { label: "Tunisia", phone: "216" },
  { label: "Tonga", phone: "676" },
  { label: "Turkey", phone: "90" },
  {
    label: "Trinidad and Tobago",
    phone: "1-868",
  },
  { label: "Tuvalu", phone: "688" },
  {
    label: "Taiwan, Province of China",
    phone: "886",
  },
  {
    label: "United Republic of Tanzania",
    phone: "255",
  },
  { label: "Ukraine", phone: "380" },
  { label: "Uganda", phone: "256" },
  {
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { label: "Uruguay", phone: "598" },
  { label: "Uzbekistan", phone: "998" },
  {
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { label: "Venezuela", phone: "58" },
  {
    label: "British Virgin Islands",
    phone: "1-284",
  },
  {
    label: "US Virgin Islands",
    phone: "1-340",
  },
  { label: "Vietnam", phone: "84" },
  { label: "Vanuatu", phone: "678" },
  { label: "Wallis and Futuna", phone: "681" },
  { label: "Samoa", phone: "685" },
  { label: "Kosovo", phone: "383" },
  { label: "Yemen", phone: "967" },
  { label: "Mayotte", phone: "262" },
  { label: "South Africa", phone: "27" },
  { label: "Zambia", phone: "260" },
  { label: "Zimbabwe", phone: "263" },
];

export const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
