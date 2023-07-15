class TeamManager extends ItemManager {
    constructor() {
        super();
        self = this;
        this.api = "/api/teams";
    }

    render() {
        // Get the team table
        let table = document.getElementById('teamTable');
        showLoader();
        // Add rhideLoader();ows for each team
        this.getItems().then((items) => {
            table.innerHTML = '<tr><th>Name</th><th>Members</th><th>Action</th></tr>';
            items.forEach(function (team, index) {
                hideLoader();
                let row = self.createRow(team);
                table.appendChild(row);
                row.querySelector(".js-edit-row").addEventListener("click", () => self.editItem(index));
                row.querySelector(".js-delete-row").addEventListener("click", () => self.removeItem(index));
            });
        });
    }

    createRow(team) {
        const template = "<tr><td>{0}</td><td>{1}</td><td class='actions'>{2}</td></tr>";
        const editButton = getButtonHtml("Edit", "js-edit-row action");
        const deleteButton = getButtonHtml("Delete", "js-delete-row action");
        let row = template.replace("{0}", team.name)
            .replace("{1}", (team.members ? team.members.join(', ') : ""))
            .replace("{2}", editButton + deleteButton);
        return createHtmlElement(row);
    }

    getItemFromUI() {
        const teamNameId = document.getElementById('teamId').value;
        const teamName = document.getElementById('teamName').value;
        const teamMembers = document.getElementById('teamMembers').value.split(',').map(x=>x.trim());
        return {
            id: teamNameId,
            name: teamName,
            members: teamMembers
        };
    }

    setItemOnUI(item) {
        document.getElementById('teamId').value=item.id;
        document.getElementById('teamName').value=item.name;
        document.getElementById('teamMembers').value=(item.members?item.members.map((x)=>x.trim()).join(", "):"");    
    }

    resetItemOnUI() {
        document.getElementById('teamId').value = '';
        document.getElementById('teamName').value = '';
        document.getElementById('teamMembers').value = '';
    }

    isValid(item) {
        return (item && item.name && item.name.trim() != "" && item.members && item.members.length > 0 && item.members[0] != "");
    }

    initialize() {
        const addButton = document.getElementById('add');
        addButton.addEventListener('click', () => this.addItem());

        const updateButton = document.getElementById('update');
        updateButton.addEventListener('click', () => this.saveItem());

        const cancelButton = document.getElementById('cancel');
        cancelButton.addEventListener('click', () => this.cancelEdit());

        const clearButton = document.getElementById('clear');
        clearButton.addEventListener('click', () => this.clear());

        this.actions = {
            add: addButton,
            update: updateButton,
            cancel: cancelButton
        };
        this.render();
    }
}

const teamManager = new TeamManager();
