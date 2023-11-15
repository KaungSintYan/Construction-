import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { languages } from './i18n'
import { defaultLocale } from './i18n'
import { createI18n } from 'vue-i18n'
/* import specific icons */
import { faHome, faBell, faPlus, faAngleRight, faCog, faUser, faCalendar, faCommenting, faTasks, faStar,
    faCaretDown, faArrowUp, faFolderPlus, faLock, faMobile, faRightFromBracket, faAngleLeft, faPencilSquare,
    faTrash, faSearch, faPlusCircle, faCircleXmark, faFileImport,faSortUp, faSortDown, faFileArchive, faSliders,faPenToSquare,
    faFile,faUserPlus,faArrowRightToBracket,faPencil,faCheck,faSearchPlus, faEllipsisV,faStamp,faWallet,faLaptop,faWindowRestore,faPaperPlane,faStore,
    faEye,faBuildingShield,faBars
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faHome, faBell, faPlus, faAngleRight, faCog, faUser , faCalendar, faCommenting , faTasks, faStar,
    faCaretDown, faArrowUp, faFolderPlus, faLock, faMobile, faRightFromBracket, faAngleLeft, 
    faPencilSquare, faTrash, faSearch, faPlusCircle, faCircleXmark, faFileImport, faSortUp, faSortDown, faFileArchive, faSliders,faPenToSquare,
    faFile,faUserPlus,faArrowRightToBracket,faPencil,faCheck,faSearchPlus,faEllipsisV,faStamp,faWallet,faLaptop,faWindowRestore,faPaperPlane,faStore,
    faEye,faBuildingShield,faBars
    )

    const messages = Object.assign(languages)
    const i18n = createI18n({
    legacy: false, 
    locale: defaultLocale,   
    fallbackLocale: "en",  
    messages: messages,
  });

createApp(App).use(store).use(router).use(bootstrap).use(ElementPlus)
.component('font-awesome-icon', FontAwesomeIcon).use(i18n)
.mount('#app');
