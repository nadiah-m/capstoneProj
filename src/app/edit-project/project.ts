export class Project {
  id: number | any;
  projectName: string | any;
  startDate: string | any;
  projectDesc: string | any;
  projectCost: number | any;
  currentExp: number | any;
  availFunds: number | any;
  status: string | any;
  clientId: number | any;

  constructor()
  {
    this.id = null;
    this.projectName = null;
    this.startDate = null;
    this.projectDesc = null;
    this.projectCost = null;
    this.currentExp = null;
    this.availFunds = null;
    this.status = null;
    this.clientId = null;
  }
}
