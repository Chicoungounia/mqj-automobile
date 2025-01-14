import { FormulaireUserComponent } from './formulaires/formulaire-user/formulaire-user.component';
import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ProduitsComponent } from './produits/produits.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ClientsComponent } from './clients/clients.component';
import { ConnectionComponent } from './identification/connection/connection.component';
import { FormulaireClientComponent } from './formulaires/formulaire-client/formulaire-client.component';
import { ConditionUtilisationComponent } from './condition-utilisation/condition-utilisation.component';
import { ModificationClientComponent } from './formulaires/formulaire-client/modification-client/modification-client.component';
import { AuthGuard } from './identification/auth.guard';

export const routes: Routes = [
{ path: "", component: AccueilComponent, pathMatch: 'full' },
  { path: "accueil", component: AccueilComponent, pathMatch: 'full' },
  { path: "connection", component: ConnectionComponent, pathMatch: 'full' },

  // Routes protégées par AuthGuard
  { path: "utilisateurs", component: UtilisateursComponent, canActivate: [AuthGuard] },
    {path: "nouvel-utilisateur", component: FormulaireUserComponent, canActivate: [AuthGuard]},
  { path: "produits", component: ProduitsComponent, canActivate: [AuthGuard] },
  { path: "commandes", component: CommandesComponent, canActivate: [AuthGuard] },
  { path: "clients", component: ClientsComponent, canActivate: [AuthGuard] },
  { path: "nouveau-client", component: FormulaireClientComponent, canActivate: [AuthGuard] },
  { path: "modification-client/:id", component: ModificationClientComponent, canActivate: [AuthGuard] },
  { path: "condition-utilisation", component: ConditionUtilisationComponent }
];
