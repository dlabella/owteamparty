class TeamManager extends ItemManager {
    constructor() {
        super();
        self = this;
        this.api = "/api/teams";
    }

    render() {
        // Get the team table
        let table = document.getElementById('teamTable');
        table.innerHTML = '<tr><th>Name</th><th>Members</th><th>Action</th></tr>';

        // Add rows for each team
        this.getItems().then((items) => {
            items.forEach(function (team, index) {
                let row = self.createRow(team);
                table.appendChild(row);
                row.querySelector(".js-edit-row").addEventListener("click", () => self.editTeam(index));
                row.querySelector(".js-delete-row").addEventListener("click", () => self.deleteTeam(index));
            });
        });
    }

    createRow(team) {
        const template = "<tr><td>{0}</td><td>{1}</td><td class='actions'>{2}</td></tr>";
        const editButton = getButtonHtml("Edit", "js-edit-row action");
        const deleteButton = getButtonHtml("Delete", "js-delete-row action");
        let row = template.replace("{0}", team.name)
            .replace("{1}", team.members.join(', '))
            .replace("{2}", editButton + deleteButton);
        return createHtmlElement(row);
    }

    getTeamFromUI() {
        const teamName = document.getElementById('teamName').value;
        const teamMembers = document.getElementById('teamMembers').value.split(',');
        return {
            name: teamName,
            members: teamMembers
        };
    }

    resetTeamFromUI() {
        document.getElementById('teamName').value = '';
        document.getElementById('teamMembers').value = '';
    }

    addTeam() {
        let team = this.getTeamFromUI();
        if (!this.isValidTeam(team)) {
            alert("Team must have a name and members!");
            return;
        }
        this.addItem(team);
        this.resetTeamFromUI();
    }
    isValidTeam(team) {
        return (team && team.name && team.name.trim() != "" && team.members && team.members.length > 0 && team.members[0] != "");
    }
    updateTeam() {
        let team = this.getTeamFromUI();
        if (!this.isValidTeam(team)) {
            alert("Team must have a name and members!");
            return;
        }
        this.updateItem(teamManager.editingIndex, team);
        showElement(this.actions.add);
        this.actions.update.disabled = true;
        this.actions.cancel.disabled = true;
        this.resetTeamFromUI();
    }

    editTeam(index) {
        const team = this.items[index];
        document.getElementById('teamName').value = team.name;
        document.getElementById('teamMembers').value = team.members.join(', ');
        hideElement(this.actions.add);
        this.actions.update.disabled = false;
        this.actions.cancel.disabled = false;
        this.editingIndex = index;
    }

    cancelEdit() {
        this.editingIndex = -1;
        this.actions.update.disabled = true;
        this.actions.cancel.disabled = true;
        showElement(this.actions.add);
        this.resetTeamFromUI();
    }

    deleteTeam(index) {
        this.deleteItem(index);
    }

    initialize() {

        const addButton = document.getElementById('add');
        addButton.addEventListener('click', () => this.addTeam());

        const updateButton = document.getElementById('update');
        updateButton.addEventListener('click', () => this.updateTeam());

        const cancelButton = document.getElementById('cancel');
        cancelButton.addEventListener('click', () => this.cancelEdit());
        this.actions = {
            add: addButton,
            update: updateButton,
            cancel: cancelButton
        };
        this.render();
    }
}

const teamManager = new TeamManager();
