import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASEURL

const state = {
    projectName: "",
    projectDescription: "",
    projectCreatedOn: "",
    projectCompletion: "",
    projectTickets: [],
    projectDetails: {},
    staffs: []
};

const getters = {
    projectName: (state) => state.projectName,
    projectDescription: (state) => state.projectDescription,
    projectCreatedOn: (state) => state.projectCreatedOn,
    projectCompletion: (state) => state.projectCompletion,
    projectTickets: (state) => state.projectTickets,
    projectDetails: (state) => state.projectDetails,
    staffs: (state) => state.staffs
};

const actions = {
    async fetchProjectTickets({ commit }, test) {
        const response = await axios(BASE_URL + `/api/projects/${test}`, {
            headers: {
                "Authorization": "bearer "+ localStorage.getItem('token') ,
                "Accept": "application/json",
            }
        });

        commit('setProjectDetails', response.data)
    },


    async createTicket({ commit }, payload ) {
        const response = await axios.post(BASE_URL + '/api/tickets/create', { 
            title: payload.title,
            description: payload.description,
            priority: payload.priority, 
            assigneeId: payload.assigneeId, 
            projectId: payload.projectId 
        },
        {
            headers: {
                "Authorization": "bearer "+ localStorage.getItem('token') ,
                "Accept": "application/json",
            },
        });
 
        commit('addTicket', response.data);
    },

    async deleteTicket({ commit }, ticketId) {
        await axios.delete(BASE_URL + `/api/tickets${ticketId}`);
        
        commit('deleteTicket', ticketId);
    },

    async editProject({ commit }, payload) {
        const response = await axios.put(BASE_URL + `/api/projects/${payload.projectId}`, 
        {
            name: payload.projectName,
            description: payload.projectDescription
        }, 
        {
            headers: {
                "Authorization": "bearer "+ localStorage.getItem('token') ,
                "Accept": "application/json",
            }
        });
        
        commit('editProject', response.data);
    },

    async fetchStaffs({commit}) {
        const response = await axios(BASE_URL + '/api/users', {
            headers: {
                "Authorization": "bearer "+ localStorage.getItem('token') ,
                "Accept": "application/json",
            }
        });

        commit('setStaffs', response.data);
    }

};

const mutations = {
    setProjectDetails: (state, data) => { 
        state.projectName = data.name,
        state.projectDescription = data.description,
        state.projectCreatedOn = data.createdOn,
        state.projectCompletion = data.completion,
        state.projectTickets = data.tickets
    },
    editProject: (state, data) => {
        state.projectName = data.name 
        state.projectDescription = data.description
    },
    addTicket: (state, ticket) => state.projectTickets.unshift(ticket),
    deleteTicket: (state, ticketId) => state.tickets.filter(ticketId),
    setStaffs: (state, staffs) => state.staffs = staffs.map(element => {
        return {
            text: element.name,
            value: element.userId
        }
    })
};

export default ({
    state,
    getters,
    actions,
    mutations
})