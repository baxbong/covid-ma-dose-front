import VaccinationCenter from './components/VaccinationCenter.vue';
import Home from "@/components/Home";

const routes = [
    { path: '/cities/:city', component: VaccinationCenter },
    { path: '/', component: Home },
];

export default routes;
