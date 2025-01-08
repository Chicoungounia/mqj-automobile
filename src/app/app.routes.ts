import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ProduitsComponent } from './produits/produits.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ClientsComponent } from './clients/clients.component';
import { InscriptionComponent } from './identification/inscription/inscription.component';
import { ConnectionComponent } from './identification/connection/connection.component';

export const routes: Routes = [

    {
        path: "",
        component: AccueilComponent,
        pathMatch: 'full'

    },

    {
        path: "accueil",
        component: AccueilComponent,
        pathMatch: 'full'

    },

    {
        path: "connection",
        component: ConnectionComponent,
        pathMatch: 'full'

    },

    {
        path: "inscription",
        component: InscriptionComponent,
        pathMatch: 'full'

    },

    {
        path: "utilisateurs",
        component: UtilisateursComponent,
        pathMatch: 'full'

    },
    {
        path: "produits",
        component: ProduitsComponent,
        pathMatch: 'full'

    },
    {
        path: "commandes",
        component: CommandesComponent,
        pathMatch: 'full'

    },
    {
        path: "clients",
        component: ClientsComponent,
        pathMatch: 'full'

    },



];
