class TeamManager extends ItemManager {
    constructor() {
        super();
        self = this;
    }

    render() {
        // Get the team table
        let table = document.getElementById('teamTable');

        // Clear the table body
        table.innerHTML = '<tr><th>Name</th><th>Members</th><th>Action</th></tr>';

        // Add rows for each team
        this.items.forEach(function (team, index) {
            let row = table.insertRow();

            let nameCell = row.insertCell();
            nameCell.innerHTML = team.name;

            let membersCell = row.insertCell();
            membersCell.innerHTML = team.members.join(', ');

            let actionCell = row.insertCell();
            let editButton = document.createElement('button');
            editButton.innerHTML = 'Edit';
            editButton.addEventListener("click", () => self.editTeam(index));
            actionCell.appendChild(editButton);

            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.addEventListener("click", () => self.deleteTeam(index));
            actionCell.appendChild(deleteButton);
        });
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
        this.addItem(team);
        this.resetTeamFromUI();
    }

    updateTeam() {
        let team = this.getTeamFromUI();
        this.updateItem(teamManager.editingIndex, team);
        this.resetTeamFromUI();
    }

    editTeam(index) {
        const team = this.items[index];
        document.getElementById('teamName').value = team.name;
        document.getElementById('teamMembers').value = team.members.join(', ');
        document.getElementById('addTeamButton').style.display = 'none';
        document.getElementById('updateTeamButton').style.display = 'inline-block';
        document.getElementById('cancelButton').style.display = 'inline-block';
        this.editingIndex = index;
    }

    cancelEdit() {
        this.editingIndex = -1;
        this.resetTeamFromUI();
    }

    deleteTeam(index) {
        this.deleteItem(index);
    }
    initialize() {
        const addButton = document.getElementById('addTeamButton');
        addButton.addEventListener('click', () => this.addTeam());

        const updateButton = document.getElementById('updateTeamButton');
        updateButton.addEventListener('click', () => this.updateTeam());

        const cancelButton = document.getElementById('cancelButton');
        cancelButton.addEventListener('click', () => this.cancelEdit());

        this.render();
    }
}

const teamManager = new TeamManager();
  // You can now use teamManager.addItem(), teamManager.editItem(), and teamManager.deleteItem() methods.
