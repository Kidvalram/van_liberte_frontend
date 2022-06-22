import background1 from 'assets/images/customer/home-photos-8.jpg';
import background2 from 'assets/images/customer/home-photos-2.jpg';
import background3 from 'assets/images/customer/home-photos-3.jpg';
import background4 from 'assets/images/customer/home-photos-4.jpg';

import partageIcon from 'assets/images/customer/partage-icon.png';
import cleIcon from 'assets/images/customer/cle-icon.png';
import fiabiliteIcon from 'assets/images/customer/fiabilite-icon.png';
import sereniteIcon from 'assets/images/customer/serenite-icon.png';
import liberteIcon from 'assets/images/customer/liberte-icon.png';

export const data = [
  {
    id: 1,
    title: "Mes promesses",
    background: background4 ,
    info: [
      {
        id: 1,
        title: "PARTAGE",
        description: "Je cultive les échanges dans la bienveillance",
        icon: partageIcon,
      },
      {
        id: 2,
        title: "FIABILITÉ",
        description: "Véhicule très récent, entretenu régulièrement",
        icon: fiabiliteIcon
      },
      {
        id: 3,
        title: "SÉRÉNITÉ",
        description: "Tranquilité d'esprit pendant ses vacances avec l'assistance 24h/7j",
        icon: sereniteIcon,
      }
    ],
  },
  {
    id: 2,
    background: background1,
    info: [
      {
        id: 1,
        title: "CLÉ-EN-MAIN",
        description: "Prêt à partir, réservoirs pleins et briefing complet avant le départ",
        icon: cleIcon,
      },
      {
        id: 2,
        title: "LIBERTÉ",
        description: "Délicieuse opportunité d'aller et de vous arrèter au gré de vos envies",
        icon: liberteIcon,
      }
    ],
  },
  {
    id: 3,
    title: "Equipements",
    info: [
      {
        id: 1,
        title: "Jusqu’à 4 personnes\n\n",
        description: "4 places assises\n\n" + "4 couchages (2x2)\n\n" +
        "Matelas confort en bas\n\n" + "Lit avec sommier à coupelles en haut\n\n" +
        "Toit relevable électro-hydraulique avec ouvertures\n\n" +
        "Auvent latéral accompagné de la table extérieure et de 4 sièges\n\n" +
        "Cuisine : évier, 2 feux de cuisson, réfrigérateur, table amovible, nécessaire de cuisine",
        background: background1,
      },
      {
        id: 2,
        title: "Confort de conduite\n\n",
        description: "Boîte manuelle\n\n" + "Sièges avant pivotants\n\n" +
        "Diesel = faible conso (8L/ 100 km)\n\n" +
        "régulateur de vitesse\n\n alarme de fatigue\n\n radars de recul et de côté\n\n" +
        `cockpit avec écran tactile : connexion de votre tel avec l’appli "car play"`,
        background: background2,
      },
      {
        id: 3,
        title: "Pour une fabuleuse autonomie\n\n",
        description: "Douche extérieure et réserve d’eau de 35L\n\n" +
        "Chauffage stationnaire (batteries autonomes)\n\n" +
        "Ouverture panoramique de la toile du toit à l’avant\n\n" +
        "Unité de commande tactile pour gérer le mode camping (toit, chauffage, frigo, éclairage..)\n\n" + 
        "et quelques surprises...",
        background: background3,
      }
    ],
  },
];