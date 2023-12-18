# Web-Project
Our web applications project

Ohjelmoinnin sovellusprojekti 

#Elokuvasovellus 

 
18.12.2023 – Iiro Moilanen, Nea Brännfors, Veeti Kokkonen, Eetu Purhonen, Iivari Rantala 

 

# Esittely 

Tämän tekstin aiheena on Web-Ohjelmoinnin sovellusprojekti. 15 opintopisteen projektin aiheena oli tehdä React pohjainen nettisivu elokuvaharrastajille. Tämän projektin toteuttivat toisen vuoden ohjelmistokehityksen opiskelijat. Nettisivulla vieraileva käyttäjä voi selailla erilaisia elokuvia ja sarjoja erilaisilla suodatuksilla.  Nettisivulle voi myös luoda käyttäjän, joka mahdollistaa uusien ryhmien luomisen valitsemallaan nimellä. Ryhmäsivulla voit luoda ryhmiä, joissa voi lähettää viestejä ryhmien muille jäsenille. Ryhmäsivun omistaja voi myös lisätä ja poistaa ryhmän jäseniä. Kirjautumatta sovellukseen käyttäjä näkee vain listan luoduista ryhmistä sekä niiden nimet ja kuvaukset mutta ei pääse liittymään ryhmiin kirjautumatta sisään. 

 

# Menetelmät 

Sovellus on tehty JavaScript-ohjelmointikielellä hyödyntämällä Reactia, joka on JavaScript-kirjasto. Sovelluksessa on hyödynnetty avoimen datan lähteinä The movie database (https://developer.themoviedb.org/reference/intro/getting-started), joka sisältää suuren määrän elokuviin liittyvää avointa dataa IMDB:stä, sekä Finnkinon tarjoamasta API:stä (https://www.finnkino.fi/xml/), jonka kautta voi hakea tietoa uutisista ja esim. eri teattereiden esitysajoista. Lisäksi sovellukseen on tehty oma palvelin ja tietokanta Renderissä sovelluksen oman datan hallitsemiseen. 

 

# Tekijät ja työvaiheet 

Projektiin osallistui Eetu Purhonen, Iivari Rantala, Nea Brännfors, Veeti Kokkonen ja Iiro Moilanen. Sovimme ryhmän kanssa, että jokainen tekee omaan komponenttiinsa frontend- näkymän, backend endpointit sekä tarvittavat tietokantamuutokset. Näin jokaiselle saatiin fullstack- tekemistä, joka oli projektin yksi vaatimus.   

 

Eetu oli vastuussa jokaisen sivun responsiivisuudesta ja värimaailmasta. Eetu oli myös vastuussa Options-valikon luomisesta ja sen toimivuudesta. Options-osiosta löytyy Appearance, josta löytyy käyttäjänimi, käyttäjätunnus sekä käyttäjän luomat arvostelut. Preferences, jonka avulla käyttäjä voi muokata haluamansa teeman kirkkaan ja tumman välillä sekä vaihtaa aikavyöhykettään nettisivun kelloa varten. Other, jonka alta käyttäjä pystyy poistamaan oman tilinsä. Eetu oli myös mukana Review- ja News-osioissa. 

 

Iivari teki Group-ryhmäosion ja osan Movie details elokuvien lisätietosivuista. Movie details -sivuilla käyttäjä näkee tietoja elokuvista ja sarjoista, kuten näyttelijät ja heidän roolinsa sekä lyhyen elokuvan kuvauksen. Groups sivulla näkyvät kaikki saatavilla olevat ryhmät, sekä kirjautuneelle käyttäjälle näkyy myös vaihtoehto luoda oma ryhmä. Kirjautunut käyttäjä voi myös lähettää liittymispyynnön ryhmiin. Ryhmän sisällä on keskustelupalsta sekä ryhmän omistajalle painikkeet jäsenten lisäämiseen ja poistamiseen ryhmästä.  

 
Nea teki nettisivuille käyttäjän luonti- ja kirjautumissivut Register ja Sign in. Luodessaan tunnuksia käyttäjältä vaaditaan etu- ja sukunimi, käyttäjätunnus ja salasana. Kirjautuessaan käyttäjältä vaaditaan vain käyttäjätunnus ja salasana. Käyttäjä autentikoidaan lähettämällä käyttäjänimi ja salasana palvelimelle. Palvelin tarkistaa nämä tiedot ja, jos ne ovat oikein, palauttaa tokenin. Tokeni tallennetaan selaimen SessionStorage-tilaan. Tämä tarkoittaa, että tokeni, on käytettävissä vain kyseisen selainistunnon aikana. Kun käyttäjä sulkee selaimen tai välilehden, SessionStorage-tiedot poistuvat. 
 

Iiro teki Movies-sivun sekä Review-komponentit, joissa käyttäjä voi selailla erilaisia elokuvia ja sarjoja erilaisten filttereiden avulla. Elokuvista ja sarjoista klikkaamalla pääsee näkemään tietoja kyseisestä ohjelmasta ja samalla jättämään oman arvostelun. Review-komponentti on kaksiosainen. Siellä voi selata ja kirjoittaa arvosteluita. Arvostelujen selausosiossa näkee elokuvalle annettujen arvosteluiden keskiarvon. 
 

Veeti teki nettisivujen Home-sivun ja Searchbar-elementin. Home-sivulla näkee tämän hetken kolme suosituinta elokuvaa ja uutisia liittyen elokuvateollisuuteen. Searchbar-elementillä voi hakea elokuvia tai sarjoja ja ne voidaan lajitella genren mukaan. Kun haetusta elokuvasta klikkaa, sivusto vie käyttäjän aiemmin mainitulle Movie Details-sivulle. Veeti oli mukana myös Groups-, News- ja Reviews-osioiden teossa.  

 

 

# Tietokantarakenne 

Postgre -tietokanta on pystytetty Render -palvelussa ja sitä käytetään Visual Studio Code- sovelluksen MySQL- lisäosan avulla. Tietokannassa on erilliset taulut jokaiselle sovelluksen osa-alueelle, joihin tallennetaan tietoja sovelluksesta palvelimen välityksellä. Tietojen haku tietokannasta tapahtuu myös palvelimen kautta. 

 

 

# Rajapintakuvaus 

REST- rajapinta on toteutettu Visual Studio Code -sovelluksessa ja sen toimintaa testataan Postman- sovelluksella. Rajapinta sisältää kaikkien komponenttien endpointit (endpoint on pala koodia, joka yhdistää sovelluksen, tietokannan ja palvelimen). Endpointtien kautta voidaan esimerkiksi tallentaa käyttäjän tiedot sekä muutokset tietokantaan ja hakea arvosteluita elokuviin. Postman sovelluksella testataan endpointtien toimivuus ennen niiden yhdistämistä itse sovellukseen. Tällä tyylillä virheiden etsiminen ja välttäminen on helpompaa.  

 

# Käyttöliittymä 

 Käyttöliittymäsuunnitelma on tehty käyttäen Figma-ryhmätyösovellusta. 

![alt text](https://cdn.discordapp.com/attachments/1171772409540522045/1172153067051958302/image.png?ex=655f479c&is=654cd29c&hm=a6f771bec1af3611bdf4243c13bbf62dca28d28c9c439b0f61240a358d3a2c29&)
KUVA 1. Frontpage 

![alt text](https://cdn.discordapp.com/attachments/1171772409540522045/1172152928157564948/image.png?ex=655f477b&is=654cd27b&hm=378132982c3e88a8c7c647a7b3fe83b35a18b1e9b32d1c2ff52e49154d59320c&)
KUVA 2. Register/Sign in ja Group pages. 

![alt text](https://cdn.discordapp.com/attachments/1171772409540522045/1172153357469765712/image.png?ex=655f47e1&is=654cd2e1&hm=8e5edcb61ca0ebe032fa1a40ee497a0e73ae9da4f0b533dc07996a35d1f5d5f4&)
![alt text](https://cdn.discordapp.com/attachments/1171772409540522045/1172153172006027335/image.png?ex=655f47b5&is=654cd2b5&hm=27731c4d2201262cd68c22ae01351589b838f85ea8208bb577297ad2bb9a73b1&)

KUVA 3. Options/ Mobile Version 

# Käyttöönotto 

Sovellus otetaan käyttöön Render- sivustolla. Render -sivustolle yhdistetään projektin GitHub- repositoriin talletettu sovellus, jolloin Render -sivusto tekee siitä toimivan nettisivun.  

Linkki valmiiseen sovellukseen:  

(https://leffasovellus-r11.onrender.com/) 

 


# ER-Kaavio
![alt text](https://cdn.discordapp.com/attachments/1171772409540522045/1171782631294238720/image.png?ex=655dee9d&is=654b799d&hm=230785bd66b535bf17198f4a1ed7a1eec6088b9d6c21a4113a45ae7ff5cd17e7&)

#REST-Documentation

(https://documenter.getpostman.com/view/25692396/2s9YkjCPvg)
