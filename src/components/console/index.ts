import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class Console extends Vue {
  @State("console") list: Types.Link[];
}
