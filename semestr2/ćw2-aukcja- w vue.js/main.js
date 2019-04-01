Vue.component("auction-item", {
  props: ["auction"],
  template: ` 
  <div>
        <li>
            Tytuł: {{auction.name}}
            Cena wywoławcza: {{auction.price}} <br>
            <button @click.prevent="$emit('close-auction',auction.id)">Zakończ aukcję</button>
            <br><br>
            <strong>Lista ofert:</strong>
            <ul>
                <li v-for="offer in auction.offers">
                    osoba: {{offer.name}}, oferta: {{offer.price}},
                    <button @click="removeOffer(offer.id)">Usuń oferte</button>
                </li>
            </ul>
        </li>
        <add-new-offer
          :offers="auction.offers"
          :auction-price="auction.price"
          :heightsOffer="heightsOfferPrice()">
        </add-new-offer>
  </div>
    `,

  methods: {
    removeOffer(id) {
      this.auction.offers = this.auction.offers.filter(
        offer => offer.id !== id
      );
    },
    heightsOfferPrice() {
      if (this.auction.offers.length > 0) {
        return this.auction.offers[this.auction.offers.length - 1].price;
      } else {
        return this.auction.price;
      }
    }
  }
});

Vue.component("add-new-offer", {
  data() {
    return {
      newOffer: {
        name: "",
        price: 0,
        found: false
      },
      newOfferId: 0
    };
  },
  props: ["offers", "auction-price", "heightsOffer"],
  template: `
    <form @submit.prevent="addNewOffer">
    <label for="offer.name">Tytuł nowej oferty</label>
    <input name="offer.name" id="offer.name"
    v-model="newOffer.name"/>
    <label for="offer-price">cenna wywoławcza</label>
    <input name="offer-price" id="offer.price" type="number"
    min="auction-price" v-model="newOffer.price"/>
    <button type="submit">Dodaj nową ofertę</button>
    </form>
    
    `,
  methods: {
    addNewOffer() {
      this.newOfferID();
      this.newOffer.price = Number(this.newOffer.price);
      if (
        this.newOffer.name.length > 0 &&
        this.newOffer.price > this.heightsOffer
      ) {
        this.updateOfferExistenUser(this.newOffer);
        // aktualizacja ceny istniejacej oferty
        if (this.newOffer.found === false) {
          // dodanie nowej oferty
          this.offers.push({
            id: this.newOfferId,
            name: this.newOffer.name,
            price: this.newOffer.price
          });
        }
        this.newOffer.name = "";
        this.newOffer.price = "";
      }
    },
    newOfferID() {
      if (this.offers.length > 0) {
        this.newOfferId = this.offers[this.offers.length - 1].id;
      }
      this.newOfferId++;
    },
    updateOfferExistenUser(newOffers) {
      this.offers.forEach(item => {
        if (newOffers.name === item.name) {
          item.price = newOffers.price;
          newOffers.found = true;
        } else {
          newOffers.found = false;
        }
      });
    }
  }
});
const myApp = new Vue({
  el: '[data-id="myApp"]',
  data() {
    return {
      newAuctionId: 0,
      newAuction: {
        name: "",
        price: 0
      },
      auctionsData: [
        {
          id: 1,
          name: "Aukcja 1",
          price: 123,
          offers: [
            {
              id: 1,
              name: "krystian",
              price: 125
            }
          ]
        }
      ]
    };
  },
  methods: {
    addNewAuction() {
      this.newAuctionID();

      this.newAuction.price = Number(this.newAuction.price);

      if (this.newAuction.name.length > 0) {
        this.auctionsData.push({
          id: this.newAuctionId,
          name: this.newAuction.name,
          price: this.newAuction.price,
          offers: []
        });
        this.newAuction.name = "";
        this.newAuction.price = 0;
      }
    },

    newAuctionID() {
      if (this.auctionsData.length > 0) {
        this.newAuctionId = this.auctionsData[this.auctionsData.length - 1].id;
      }
      this.newAuctionId++;
    },

    removeAuction(id) {
      this.auctionsData = this.auctionsData.filter(
        auction => auction.id !== id
      );
    }
  }
});
