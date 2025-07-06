import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Agent {
    id: string;
    name: string;
    description: string;
    status: string;
    category: string;
    pricingModel: string;
}

interface AgentsState {
    agents: Agent[];
    filteredAgents: Agent[];
    loading: boolean;
    error: string | null;
    // Filter states
    searchQuery: string;
    selectedStatuses: string[];
    selectedCategories: string[];
    selectedPricingModel: string;
    sortBy: string;
    // Available filter options
    allStatuses: string[];
    allCategories: string[];
    allPricingModels: string[];
}

const initialState: AgentsState = {
    agents: [],
    filteredAgents: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedStatuses: [],
    selectedCategories: [],
    selectedPricingModel: 'all',
    sortBy: 'name',
    allStatuses: [],
    allCategories: [],
    allPricingModels: [],
};

// Async thunk for fetching agents data
export const fetchAgents = createAsyncThunk(
    'agents/fetchAgents',
    async () => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // Import the JSON file dynamically
            const agentsData = await import('../../../mock-agents.json');
            return agentsData.default as Agent[];
        } catch (error) {
            console.error('Error loading mock agents:', error);
            throw new Error('Failed to load agents data');
        }
    }
);

// Helper function to filter and sort agents
const filterAndSortAgents = (
    agents: Agent[],
    searchQuery: string,
    selectedStatuses: string[],
    selectedCategories: string[],
    selectedPricingModel: string,
    sortBy: string
): Agent[] => {
    return agents
        .filter((agent) => {
            // Search filter (name or description)
            const matchesSearch = searchQuery === '' ||
                agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Status filter (multiple selection)
            const matchesStatus = selectedStatuses.length === 0 ||
                selectedStatuses.includes(agent.status);

            // Category filter (multiple selection)
            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.includes(agent.category);

            // Pricing model filter (single selection)
            const matchesPricingModel = selectedPricingModel === 'all' ||
                agent.pricingModel === selectedPricingModel;

            return matchesSearch && matchesStatus && matchesCategory && matchesPricingModel;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'pricingModel':
                    return a.pricingModel.localeCompare(b.pricingModel);
                default:
                    return 0;
            }
        });
};

const agentsSlice = createSlice({
    name: 'agents',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.filteredAgents = filterAndSortAgents(
                state.agents,
                state.searchQuery,
                state.selectedStatuses,
                state.selectedCategories,
                state.selectedPricingModel,
                state.sortBy
            );
        },
        setSelectedStatuses: (state, action: PayloadAction<string[]>) => {
            state.selectedStatuses = action.payload;
            state.filteredAgents = filterAndSortAgents(
                state.agents,
                state.searchQuery,
                state.selectedStatuses,
                state.selectedCategories,
                state.selectedPricingModel,
                state.sortBy
            );
        },
        setSelectedCategories: (state, action: PayloadAction<string[]>) => {
            state.selectedCategories = action.payload;
            state.filteredAgents = filterAndSortAgents(
                state.agents,
                state.searchQuery,
                state.selectedStatuses,
                state.selectedCategories,
                state.selectedPricingModel,
                state.sortBy
            );
        },
        setSelectedPricingModel: (state, action: PayloadAction<string>) => {
            state.selectedPricingModel = action.payload;
            state.filteredAgents = filterAndSortAgents(
                state.agents,
                state.searchQuery,
                state.selectedStatuses,
                state.selectedCategories,
                state.selectedPricingModel,
                state.sortBy
            );
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
            state.filteredAgents = filterAndSortAgents(
                state.agents,
                state.searchQuery,
                state.selectedStatuses,
                state.selectedCategories,
                state.selectedPricingModel,
                state.sortBy
            );
        },
        clearAllFilters: (state) => {
            state.searchQuery = '';
            state.selectedStatuses = [];
            state.selectedCategories = [];
            state.selectedPricingModel = 'all';
            state.sortBy = 'name';
            state.filteredAgents = filterAndSortAgents(
                state.agents,
                state.searchQuery,
                state.selectedStatuses,
                state.selectedCategories,
                state.selectedPricingModel,
                state.sortBy
            );
        },
        addStatusFilter: (state, action: PayloadAction<string>) => {
            if (!state.selectedStatuses.includes(action.payload)) {
                state.selectedStatuses.push(action.payload);
                state.filteredAgents = filterAndSortAgents(
                    state.agents,
                    state.searchQuery,
                    state.selectedStatuses,
                    state.selectedCategories,
                    state.selectedPricingModel,
                    state.sortBy
                );
            }
        },
        removeStatusFilter: (state, action: PayloadAction<string>) => {
            state.selectedStatuses = state.selectedStatuses.filter(
                status => status !== action.payload
            );
            state.filteredAgents = filterAndSortAgents(
                state.agents,
                state.searchQuery,
                state.selectedStatuses,
                state.selectedCategories,
                state.selectedPricingModel,
                state.sortBy
            );
        },
        addCategoryFilter: (state, action: PayloadAction<string>) => {
            if (!state.selectedCategories.includes(action.payload)) {
                state.selectedCategories.push(action.payload);
                state.filteredAgents = filterAndSortAgents(
                    state.agents,
                    state.searchQuery,
                    state.selectedStatuses,
                    state.selectedCategories,
                    state.selectedPricingModel,
                    state.sortBy
                );
            }
        },
        removeCategoryFilter: (state, action: PayloadAction<string>) => {
            state.selectedCategories = state.selectedCategories.filter(
                category => category !== action.payload
            );
            state.filteredAgents = filterAndSortAgents(
                state.agents,
                state.searchQuery,
                state.selectedStatuses,
                state.selectedCategories,
                state.selectedPricingModel,
                state.sortBy
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAgents.fulfilled, (state, action) => {
                state.loading = false;
                state.agents = action.payload;
                state.filteredAgents = action.payload;
                // Extract unique values for filter options
                state.allStatuses = Array.from(new Set(action.payload.map(agent => agent.status)));
                state.allCategories = Array.from(new Set(action.payload.map(agent => agent.category)));
                state.allPricingModels = Array.from(new Set(action.payload.map(agent => agent.pricingModel)));
            })
            .addCase(fetchAgents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch agents';
            });
    },
});

export const {
    setSearchQuery,
    setSelectedStatuses,
    setSelectedCategories,
    setSelectedPricingModel,
    setSortBy,
    clearAllFilters,
    addStatusFilter,
    removeStatusFilter,
    addCategoryFilter,
    removeCategoryFilter,
} = agentsSlice.actions;

export default agentsSlice.reducer; 