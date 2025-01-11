import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ProduitsComponent } from './produits/produits.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ClientsComponent } from './clients/clients.component';
import { InscriptionComponent } from './identification/inscription/inscription.component';
import { ConnectionComponent } from './identification/connection/connection.component';
import { FormulaireClientComponent } from './formulaires/formulaire-client/formulaire-client.component';
import { ConditionUtilisationComponent } from './condition-utilisation/condition-utilisation.component';
import { ModificationClientComponent } from './formulaires/formulaire-client/modification-client/modification-client.component';

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
    {
        path: "nouveau-client",
        component: FormulaireClientComponent,
        pathMatch: 'full'

    },
    {
        path: "modification-client/:id",
        component: ModificationClientComponent,
        pathMatch: 'full'

    },
    {
        path: "condition-utilisation",
        component: ConditionUtilisationComponent,
        pathMatch: 'full'

    },

 




];
