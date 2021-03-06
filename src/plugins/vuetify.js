import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#5BD647",
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        calculationCard: colors.grey.lighten5,
      },
      dark: {
        primary: "#5BD647",
        calculationCard: colors.grey.darken3,
      },
    },
  },
});
