import { useAuthStore } from "@/stores/auth";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import DevicesView from "@/views/DevicesView.vue";
import NewDevice from "@/components/NewDevice.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: DashboardView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/devices",
      name: "Devices",
      component: DevicesView,
    },
    {
      path: "/devices/Newdevice",
      name: "NewDevices",
      component: NewDevice,
    },
  ],
});

// zeggen dat indien niet ingelogd we re routen naar de login
router.beforeEach(async (to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  // if authenticated
  const auth = useAuthStore();
  // if auth is required and user not logged in
  if (authRequired && auth.user == "") {
    // naar login redirect
    return "/login";
  }
});

export default router;