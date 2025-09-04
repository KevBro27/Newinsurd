import React, { useEffect } from 'react';

const CrmPage: React.FC = () => {
  useEffect(() => {
    // Global state management
    const CRM = {
        data: {
            clients: JSON.parse(localStorage.getItem('crmClients') || '[]'),
            leads: JSON.parse(localStorage.getItem('crmLeads') || '[]'),
            policies: JSON.parse(localStorage.getItem('crmPolicies') || '[]'),
            tasks: JSON.parse(localStorage.getItem('crmTasks') || '[]'),
            compliance: JSON.parse(localStorage.getItem('crmCompliance') || '{}')
        },

        save() {
            localStorage.setItem('crmClients', JSON.stringify(this.data.clients));
            localStorage.setItem('crmLeads', JSON.stringify(this.data.leads));
            localStorage.setItem('crmPolicies', JSON.stringify(this.data.policies));
            localStorage.setItem('crmTasks', JSON.stringify(this.data.tasks));
            localStorage.setItem('crmCompliance', JSON.stringify(this.data.compliance));
        },

        addClient(client: any) {
            client.id = Date.now();
            client.createdAt = new Date().toISOString();
            this.data.clients.push(client);
            this.save();
            this.updateDashboard();
            this.renderClients();
        },

        addLead(lead: any) {
            lead.id = Date.now();
            lead.createdAt = new Date().toISOString();
            lead.status = 'new';
            this.data.leads.push(lead);
            this.save();
            this.updateDashboard();
            this.renderLeads();
        },

        addTask(task: any) {
            task.id = Date.now();
            task.createdAt = new Date().toISOString();
            task.status = 'pending';
            this.data.tasks.push(task);
            this.save();
            this.updateDashboard();
            this.renderTasks();
        },

        updateLead(leadId: number, newStatus: string) {
            const lead = this.data.leads.find((l: any) => l.id === leadId);
            if (lead) {
                lead.status = newStatus;
                lead.updatedAt = new Date().toISOString();
                this.save();
                this.renderLeads();
                this.updateDashboard();
            }
        },

        completeTask(taskId: number) {
            const task = this.data.tasks.find((t: any) => t.id === taskId);
            if (task) {
                task.status = 'completed';
                task.completedAt = new Date().toISOString();
                this.save();
                this.renderTasks();
                this.updateDashboard();
            }
        },

        updateDashboard() {
            // Update KPIs
            (document.getElementById('totalClientsKPI') as HTMLElement).textContent = this.data.clients.length.toString();
            (document.getElementById('activePoliciesKPI') as HTMLElement).textContent = this.data.policies.length.toString();
            (document.getElementById('pendingTasksKPI') as HTMLElement).textContent = this.data.tasks.filter((t: any) => t.status === 'pending').length.toString();

            // Calculate monthly revenue (mock calculation)
            const monthlyRevenue = this.data.policies.reduce((sum: number, policy: any) => sum + (policy.premium || 0), 0);
            (document.getElementById('monthlyRevenueKPI') as HTMLElement).textContent = `$${monthlyRevenue.toLocaleString()}`;

            // Update charts
            this.renderCharts();
        },

        renderCharts() {
            // Pipeline Chart
            const pipelineCtx = document.getElementById('pipelineChart') as HTMLCanvasElement;
            if (pipelineCtx) {
                new (window as any).Chart(pipelineCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['New Leads', 'Contacted', 'Qualified', 'Closed'],
                        datasets: [{
                            data: [
                                this.data.leads.filter((l: any) => l.status === 'new').length,
                                this.data.leads.filter((l: any) => l.status === 'contacted').length,
                                this.data.leads.filter((l: any) => l.status === 'qualified').length,
                                this.data.leads.filter((l: any) => l.status === 'closed').length,
                            ],
                            backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }

            // Performance Chart
            const performanceCtx = document.getElementById('performanceChart') as HTMLCanvasElement;
            if (performanceCtx) {
                new (window as any).Chart(performanceCtx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'New Clients',
                            data: [12, 19, 13, 15, 22, 18],
                            borderColor: '#3b82f6',
                            tension: 0.4
                        }, {
                            label: 'Revenue',
                            data: [15000, 25000, 18000, 32000, 28000, 35000],
                            borderColor: '#10b981',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }

            // Funnel Chart
            const funnelCtx = document.getElementById('funnelChart') as HTMLCanvasElement;
            if (funnelCtx) {
                new (window as any).Chart(funnelCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Leads Generated', 'Qualified', 'Proposals Sent', 'Closed Won'],
                        datasets: [{
                            label: 'Count',
                            data: [100, 75, 45, 28],
                            backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y'
                    }
                });
            }
        },

        renderClients() {
            const tbody = document.getElementById('clientsTableBody') as HTMLElement;
            tbody.innerHTML = '';

            this.data.clients.forEach((client: any) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4">
                        <div class="font-medium text-gray-900">${client.name}</div>
                        <div class="text-sm text-gray-500">ID: ${client.id}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">${client.email}</div>
                        <div class="text-sm text-gray-500">${client.phone}</div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            ${client.policyType}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-2 py-1 text-xs rounded-full ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                            ${client.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                        ${new Date(client.createdAt).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4">
                        <button class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        },

        renderLeads() {
            const stages = ['new', 'contacted', 'qualified', 'closed'];
            stages.forEach(stage => {
                const container = document.getElementById(`${stage}Leads`) as HTMLElement;
                const countElement = document.getElementById(`${stage}LeadsCount`) as HTMLElement;
                const leads = this.data.leads.filter((l: any) => l.status === stage);

                countElement.textContent = leads.length.toString();
                container.innerHTML = '';

                leads.forEach((lead: any) => {
                    const leadCard = document.createElement('div');
                    leadCard.className = 'bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100';
                    leadCard.innerHTML = `
                        <div class="font-medium text-sm">${lead.name}</div>
                        <div class="text-xs text-gray-600">${lead.interest}</div>
                        <div class="text-xs text-gray-500 mt-1">${new Date(lead.createdAt).toLocaleDateString()}</div>
                    `;

                    leadCard.addEventListener('click', () => {
                        const nextStage: any = {
                            'new': 'contacted',
                            'contacted': 'qualified',
                            'qualified': 'closed'
                        }[stage];

                        if (nextStage) {
                            this.updateLead(lead.id, nextStage);
                        }
                    });

                    container.appendChild(leadCard);
                });
            });
        },

        renderTasks() {
            const grid = document.getElementById('tasksGrid') as HTMLElement;
            grid.innerHTML = '';

            this.data.tasks.forEach((task: any) => {
                const isOverdue = new Date(task.dueDate) < new Date() && task.status === 'pending';
                const taskCard = document.createElement('div');
                taskCard.className = `bg-white p-4 rounded-lg shadow-md card priority-${task.priority} ${isOverdue ? 'border-red-300' : ''}`;

                taskCard.innerHTML = `
                    <div class="flex justify-between items-start mb-3">
                        <h4 class="font-medium text-gray-800">${task.title}</h4>
                        <span class="px-2 py-1 text-xs rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                            ${task.priority}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">${task.description || 'No description'}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500">Due: ${new Date(task.dueDate).toLocaleDateString()}</span>
                        <button class="complete-task-btn px-3 py-1 text-xs ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded" data-task-id="${task.id}" ${task.status === 'completed' ? 'disabled' : ''}>
                            ${task.status === 'completed' ? 'Completed' : 'Complete'}
                        </button>
                    </div>
                    ${isOverdue ? '<div class="text-xs text-red-600 mt-2"><i class="fas fa-exclamation-triangle mr-1"></i>Overdue</div>' : ''}
                `;

                grid.appendChild(taskCard);
            });

            // Add event listeners for complete buttons
            document.querySelectorAll('.complete-task-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const taskId = parseInt((e.target as HTMLElement).dataset.taskId as string);
                    this.completeTask(taskId);
                });
            });
        },

        init() {
            // Initialize with sample data if empty
            if (this.data.clients.length === 0) {
                this.initSampleData();
            }

            this.updateDashboard();
            this.renderClients();
            this.renderLeads();
            this.renderTasks();

            // Set current date
            (document.getElementById('currentDate') as HTMLElement).textContent = new Date().toLocaleDateString();
        },

        initSampleData() {
            // Sample clients
            this.data.clients = [
                {
                    id: 1,
                    name: 'John Smith',
                    email: 'john.smith@email.com',
                    phone: '(555) 123-4567',
                    policyType: 'life',
                    status: 'active',
                    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 2,
                    name: 'Sarah Johnson',
                    email: 'sarah.j@email.com',
                    phone: '(555) 987-6543',
                    policyType: 'health',
                    status: 'active',
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
                }
            ];

            // Sample leads
            this.data.leads = [
                {
                    id: 1,
                    name: 'Mike Brown',
                    email: 'mike.brown@email.com',
                    phone: '(555) 456-7890',
                    interest: 'life',
                    source: 'website',
                    status: 'new',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Lisa Davis',
                    email: 'lisa.davis@email.com',
                    phone: '(555) 321-6547',
                    interest: 'property',
                    source: 'referral',
                    status: 'contacted',
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                }
            ];

            // Sample tasks
            this.data.tasks = [
                {
                    id: 1,
                    title: 'Follow up with Mike Brown',
                    description: 'Call to discuss life insurance options',
                    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    priority: 'high',
                    status: 'pending',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Review Sarah Johnson policy',
                    description: 'Annual policy review meeting',
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    priority: 'medium',
                    status: 'pending',
                    createdAt: new Date().toISOString()
                }
            ];

            // Sample policies
            this.data.policies = [
                {
                    id: 1,
                    clientId: 1,
                    policyNumber: 'LI-2023-001',
                    type: 'life',
                    premium: 150,
                    status: 'active'
                },
                {
                    id: 2,
                    clientId: 2,
                    policyNumber: 'HI-2023-002',
                    type: 'health',
                    premium: 280,
                    status: 'active'
                }
            ];

            this.save();
        }
    };

    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', function(this: HTMLElement) {
            const targetSection = this.dataset.section;

            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Show target section
            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.remove('section-hidden');
                    section.classList.add('fade-in');
                } else {
                    section.classList.add('section-hidden');
                    section.classList.remove('fade-in');
                }
            });
        });
    });

    // Modal functionality
    const modals = document.querySelectorAll('[id$="Modal"]');
    const addButtons = document.querySelectorAll('[id^="add"]');
    const closeButtons = document.querySelectorAll('.close-modal');

    addButtons.forEach(btn => {
        btn.addEventListener('click', function(this: HTMLElement) {
            const modalType = this.id.replace('add', '').replace('Btn', '').toLowerCase();
            const modal = document.getElementById(modalType + 'Modal');
            if (modal) {
                modal.classList.remove('hidden');
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modals.forEach(modal => modal.classList.add('hidden'));
        });
    });

    // Form submissions
    (document.getElementById('clientForm') as HTMLFormElement).addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const client = Object.fromEntries(formData);
        CRM.addClient(client);
        this.reset();
        (document.getElementById('clientModal') as HTMLElement).classList.add('hidden');
    });

    (document.getElementById('leadForm') as HTMLFormElement).addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const lead = Object.fromEntries(formData);
        CRM.addLead(lead);
        this.reset();
        (document.getElementById('leadModal') as HTMLElement).classList.add('hidden');
    });

    (document.getElementById('taskForm') as HTMLFormElement).addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const task = Object.fromEntries(formData);
        CRM.addTask(task);
        this.reset();
        (document.getElementById('taskModal') as HTMLElement).classList.add('hidden');
    });

    // Initialize CRM
    CRM.init();
  }, []);

  return (
    <>
      <style>{`
        .section-hidden { display: none; }
        .chart-container { position: relative; height: 300px; width: 100%; }
        .nav-item.active { background-color: #1e40af; color: white; }
        .status-new { background-color: #10b981; }
        .status-prospect { background-color: #f59e0b; }
        .status-quoted { background-color: #3b82f6; }
        .status-client { background-color: #8b5cf6; }
        .status-closed { background-color: #ef4444; }
        .priority-high { border-left: 4px solid #ef4444; }
        .priority-medium { border-left: 4px solid #f59e0b; }
        .priority-low { border-left: 4px solid #10b981; }
        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .card { transition: all 0.3s ease; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
      `}</style>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-blue-900 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className="fas fa-shield-alt text-2xl"></i>
                <div>
                  <h1 className="text-xl font-bold">Kevin Brown Jr Insurance</h1>
                  <p className="text-blue-200 text-sm">Customer Relationship Management System</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm">Welcome, Kevin</p>
                  <p className="text-xs text-blue-200" id="currentDate"></p>
                </div>
                <div className="bg-blue-800 rounded-full w-10 h-10 flex items-center justify-center">
                  <i className="fas fa-user"></i>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1 overflow-x-auto">
              <button className="nav-item px-6 py-3 text-sm font-medium rounded-t-lg active" data-section="dashboard">
                <i className="fas fa-chart-line mr-2"></i>Dashboard
              </button>
              <button className="nav-item px-6 py-3 text-sm font-medium rounded-t-lg" data-section="clients">
                <i className="fas fa-users mr-2"></i>Clients
              </button>
              <button className="nav-item px-6 py-3 text-sm font-medium rounded-t-lg" data-section="leads">
                <i className="fas fa-user-plus mr-2"></i>Leads
              </button>
              <button className="nav-item px-6 py-3 text-sm font-medium rounded-t-lg" data-section="policies">
                <i className="fas fa-file-contract mr-2"></i>Policies
              </button>
              <button className="nav-item px-6 py-3 text-sm font-medium rounded-t-lg" data-section="tasks">
                <i className="fas fa-tasks mr-2"></i>Tasks
              </button>
              <button className="nav-item px-6 py-3 text-sm font-medium rounded-t-lg" data-section="pipeline">
                <i className="fas fa-funnel-dollar mr-2"></i>Pipeline
              </button>
              <button className="nav-item px-6 py-3 text-sm font-medium rounded-t-lg" data-section="compliance">
                <i className="fas fa-clipboard-check mr-2"></i>Compliance
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Dashboard Section */}
          <section id="dashboard" className="section fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Your business performance at a glance</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Clients</p>
                    <p className="text-2xl font-bold text-blue-600" id="totalClientsKPI">0</p>
                  </div>
                  <i className="fas fa-users text-3xl text-blue-500"></i>
                </div>
              </div>
              <div className="card bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Policies</p>
                    <p className="text-2xl font-bold text-green-600" id="activePoliciesKPI">0</p>
                  </div>
                  <i className="fas fa-file-contract text-3xl text-green-500"></i>
                </div>
              </div>
              <div className="card bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Tasks</p>
                    <p className="text-2xl font-bold text-orange-600" id="pendingTasksKPI">0</p>
                  </div>
                  <i className="fas fa-clock text-3xl text-orange-500"></i>
                </div>
              </div>
              <div className="card bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-purple-600" id="monthlyRevenueKPI">$0</p>
                  </div>
                  <i className="fas fa-dollar-sign text-3xl text-purple-500"></i>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Sales Pipeline</h3>
                <div className="chart-container">
                  <canvas id="pipelineChart"></canvas>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
                <div className="chart-container">
                  <canvas id="performanceChart"></canvas>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              <div id="recentActivities" className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                  <i className="fas fa-user-plus text-green-500"></i>
                  <div>
                    <p className="text-sm"><strong>New lead added:</strong> Sarah Johnson</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Clients Section */}
          <section id="clients" className="section section-hidden fade-in">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Client Management</h2>
                      <p className="text-gray-600">Manage your existing clients and their information</p>
                  </div>
                  <button id="addClientBtn" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      <i className="fas fa-plus mr-2"></i>Add Client
                  </button>
              </div>

              {/* Client Search & Filters */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex flex-wrap gap-4">
                      <input type="text" id="clientSearch" placeholder="Search clients..." className="flex-1 min-w-64 p-2 border rounded-lg" />
                      <select id="clientStatusFilter" className="p-2 border rounded-lg">
                          <option value="">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="prospect">Prospect</option>
                      </select>
                      <select id="clientTypeFilter" className="p-2 border rounded-lg">
                          <option value="">All Types</option>
                          <option value="life">Life Insurance</option>
                          <option value="health">Health Insurance</option>
                          <option value="property">Property & Casualty</option>
                      </select>
                  </div>
              </div>

              {/* Clients Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                      <table className="w-full">
                          <thead className="bg-gray-50">
                              <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy Type</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Contact</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                              </tr>
                          </thead>
                          <tbody id="clientsTableBody" className="divide-y divide-gray-200">
                              {/* Clients will be populated here */}
                          </tbody>
                      </table>
                  </div>
              </div>
          </section>

          {/* Leads Section */}
          <section id="leads" className="section section-hidden fade-in">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Lead Management</h2>
                      <p className="text-gray-600">Track and nurture your potential clients</p>
                  </div>
                  <button id="addLeadBtn" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                      <i className="fas fa-plus mr-2"></i>Add Lead
                  </button>
              </div>

              {/* Lead Pipeline Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-800">New Leads</h3>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm" id="newLeadsCount">0</span>
                      </div>
                      <div id="newLeads" className="space-y-3 min-h-40">
                          {/* New leads will be populated here */}
                      </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-800">Contacted</h3>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm" id="contactedLeadsCount">0</span>
                      </div>
                      <div id="contactedLeads" className="space-y-3 min-h-40">
                          {/* Contacted leads will be populated here */}
                      </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-800">Qualified</h3>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm" id="qualifiedLeadsCount">0</span>
                      </div>
                      <div id="qualifiedLeads" className="space-y-3 min-h-40">
                          {/* Qualified leads will be populated here */}
                      </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-800">Closed</h3>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm" id="closedLeadsCount">0</span>
                      </div>
                      <div id="closedLeads" className="space-y-3 min-h-40">
                          {/* Closed leads will be populated here */}
                      </div>
                  </div>
              </div>
          </section>

          {/* Policies Section */}
          <section id="policies" className="section section-hidden fade-in">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Policy Management</h2>
                      <p className="text-gray-600">Track and manage all insurance policies</p>
                  </div>
                  <button id="addPolicyBtn" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                      <i className="fas fa-plus mr-2"></i>Add Policy
                  </button>
              </div>

              {/* Policy Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Life Insurance</h3>
                      <p className="text-3xl font-bold text-blue-600" id="lifeInsuranceCount">0</p>
                      <p className="text-sm text-gray-600">Active Policies</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Health Insurance</h3>
                      <p className="text-3xl font-bold text-green-600" id="healthInsuranceCount">0</p>
                      <p className="text-sm text-gray-600">Active Policies</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Property & Casualty</h3>
                      <p className="text-3xl font-bold text-orange-600" id="pcInsuranceCount">0</p>
                      <p className="text-sm text-gray-600">Active Policies</p>
                  </div>
              </div>

              {/* Policies Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b">
                      <div className="flex flex-wrap gap-4">
                          <input type="text" id="policySearch" placeholder="Search policies..." className="flex-1 min-w-64 p-2 border rounded-lg" />
                          <select id="policyTypeFilter" className="p-2 border rounded-lg">
                              <option value="">All Types</option>
                              <option value="life">Life Insurance</option>
                              <option value="health">Health Insurance</option>
                              <option value="property">Property & Casualty</option>
                          </select>
                          <select id="policyStatusFilter" className="p-2 border rounded-lg">
                              <option value="">All Status</option>
                              <option value="active">Active</option>
                              <option value="pending">Pending</option>
                              <option value="expired">Expired</option>
                          </select>
                      </div>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="w-full">
                          <thead className="bg-gray-50">
                              <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy #</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renewal</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                              </tr>
                          </thead>
                          <tbody id="policiesTableBody" className="divide-y divide-gray-200">
                              {/* Policies will be populated here */}
                          </tbody>
                      </table>
                  </div>
              </div>
          </section>

          {/* Tasks Section */}
          <section id="tasks" className="section section-hidden fade-in">
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Task Management</h2>
                      <p className="text-gray-600">Stay organized with your daily activities</p>
                  </div>
                  <button id="addTaskBtn" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                      <i className="fas fa-plus mr-2"></i>Add Task
                  </button>
              </div>

              {/* Task Filters */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex flex-wrap gap-4">
                      <select id="taskStatusFilter" className="p-2 border rounded-lg">
                          <option value="">All Tasks</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="overdue">Overdue</option>
                      </select>
                      <select id="taskPriorityFilter" className="p-2 border rounded-lg">
                          <option value="">All Priorities</option>
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                      </select>
                      <input type="date" id="taskDateFilter" className="p-2 border rounded-lg" />
                  </div>
              </div>

              {/* Tasks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="tasksGrid">
                  {/* Tasks will be populated here */}
              </div>
          </section>

          {/* Pipeline Section */}
          <section id="pipeline" className="section section-hidden fade-in">
              <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Sales Pipeline</h2>
                  <p className="text-gray-600">Track your sales opportunities and revenue</p>
              </div>

              {/* Pipeline Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-sm text-gray-600 mb-2">Pipeline Value</h3>
                      <p className="text-2xl font-bold text-blue-600" id="pipelineValue">$0</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-sm text-gray-600 mb-2">Conversion Rate</h3>
                      <p className="text-2xl font-bold text-green-600" id="conversionRate">0%</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-sm text-gray-600 mb-2">Avg. Deal Size</h3>
                      <p className="text-2xl font-bold text-purple-600" id="avgDealSize">$0</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-sm text-gray-600 mb-2">Closed This Month</h3>
                      <p className="text-2xl font-bold text-orange-600" id="closedThisMonth">$0</p>
                  </div>
              </div>

              {/* Pipeline Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-lg font-semibold mb-4">Sales Funnel</h3>
                  <div className="chart-container" style={{height: '400px'}}>
                      <canvas id="funnelChart"></canvas>
                  </div>
              </div>
          </section>

          {/* Compliance Section */}
          <section id="compliance" className="section section-hidden fade-in">
              <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Compliance Tracking</h2>
                  <p className="text-gray-600">Ensure regulatory compliance and track certifications</p>
              </div>

              {/* Compliance Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex items-center justify-between">
                          <div>
                              <h3 className="text-lg font-semibold">License Status</h3>
                              <p className="text-green-600 font-medium">Active</p>
                          </div>
                          <i className="fas fa-certificate text-3xl text-green-500"></i>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Expires: December 2024</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex items-center justify-between">
                          <div>
                              <h3 className="text-lg font-semibold">CE Credits</h3>
                              <p className="text-blue-600 font-medium">24/24 Complete</p>
                          </div>
                          <i className="fas fa-graduation-cap text-3xl text-blue-500"></i>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Next cycle: January 2025</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex items-center justify-between">
                          <div>
                              <h3 className="text-lg font-semibold">E&O Insurance</h3>
                              <p className="text-purple-600 font-medium">Active</p>
                          </div>
                          <i className="fas fa-shield-alt text-3xl text-purple-500"></i>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Expires: March 2025</p>
                  </div>
              </div>

              {/* Compliance Checklist */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-4">Monthly Compliance Checklist</h3>
                  <div className="space-y-3" id="complianceChecklist">
                      <div className="flex items-center space-x-3">
                          <input type="checkbox" className="compliance-item" data-item="privacy-policy" />
                          <label className="text-gray-700">Review and update privacy policy disclosures</label>
                      </div>
                      <div className="flex items-center space-x-3">
                          <input type="checkbox" className="compliance-item" data-item="client-files" />
                          <label className="text-gray-700">Audit client file documentation</label>
                      </div>
                      <div className="flex items-center space-x-3">
                          <input type="checkbox" className="compliance-item" data-item="marketing-review" />
                          <label className="text-gray-700">Review marketing materials for compliance</label>
                      </div>
                      <div className="flex items-center space-x-3">
                          <input type="checkbox" className="compliance-item" data-item="record-retention" />
                          <label className="text-gray-700">Verify record retention procedures</label>
                      </div>
                  </div>
              </div>

              {/* Document Storage */}
              <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Important Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                              <i className="fas fa-file-pdf text-red-500 text-xl"></i>
                              <div>
                                  <p className="font-medium">Insurance License</p>
                                  <p className="text-sm text-gray-600">Updated: Nov 2023</p>
                              </div>
                          </div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                              <i className="fas fa-file-pdf text-red-500 text-xl"></i>
                              <div>
                                  <p className="font-medium">E&O Insurance Policy</p>
                                  <p className="text-sm text-gray-600">Updated: Mar 2023</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
        </main>

        {/* Modals */}
        {/* Add Client Modal */}
        <div id="clientModal" className="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
          <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Add New Client</h3>
                      <button className="close-modal text-gray-400 hover:text-gray-600">
                          <i className="fas fa-times"></i>
                      </button>
                  </div>
                  <form id="clientForm">
                      <div className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                              <input type="text" name="name" required className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input type="email" name="email" required className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                              <input type="tel" name="phone" required className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
                              <select name="policyType" required className="w-full p-2 border rounded-lg">
                                  <option value="">Select Type</option>
                                  <option value="life">Life Insurance</option>
                                  <option value="health">Health Insurance</option>
                                  <option value="property">Property & Casualty</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                              <select name="status" required className="w-full p-2 border rounded-lg">
                                  <option value="prospect">Prospect</option>
                                  <option value="active">Active Client</option>
                                  <option value="inactive">Inactive</option>
                              </select>
                          </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                          <button type="button" className="close-modal px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50">Cancel</button>
                          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Client</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>

      {/* Add Lead Modal */}
      <div id="leadModal" className="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
          <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Add New Lead</h3>
                      <button className="close-modal text-gray-400 hover:text-gray-600">
                          <i className="fas fa-times"></i>
                      </button>
                  </div>
                  <form id="leadForm">
                      <div className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                              <input type="text" name="name" required className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input type="email" name="email" className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                              <input type="tel" name="phone" className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
                              <select name="interest" required className="w-full p-2 border rounded-lg">
                                  <option value="">Select Interest</option>
                                  <option value="life">Life Insurance</option>
                                  <option value="health">Health Insurance</option>
                                  <option value="property">Property & Casualty</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                              <select name="source" className="w-full p-2 border rounded-lg">
                                  <option value="website">Website</option>
                                  <option value="referral">Referral</option>
                                  <option value="social">Social Media</option>
                                  <option value="advertising">Advertising</option>
                                  <option value="other">Other</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                              <textarea name="notes" rows={3} className="w-full p-2 border rounded-lg"></textarea>
                          </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                          <button type="button" className="close-modal px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50">Cancel</button>
                          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add Lead</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>

      {/* Add Task Modal */}
      <div id="taskModal" className="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
          <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Add New Task</h3>
                      <button className="close-modal text-gray-400 hover:text-gray-600">
                          <i className="fas fa-times"></i>
                      </button>
                  </div>
                  <form id="taskForm">
                      <div className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                              <input type="text" name="title" required className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <textarea name="description" rows={3} className="w-full p-2 border rounded-lg"></textarea>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                              <input type="date" name="dueDate" required className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                              <select name="priority" required className="w-full p-2 border rounded-lg">
                                  <option value="low">Low</option>
                                  <option value="medium" >Medium</option>
                                  <option value="high">High</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Related to</label>
                              <select name="relatedTo" className="w-full p-2 border rounded-lg">
                                  <option value="">General</option>
                                  <option value="client">Client</option>
                                  <option value="lead">Lead</option>
                                  <option value="policy">Policy</option>
                              </select>
                          </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-6">
                          <button type="button" className="close-modal px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50">Cancel</button>
                          <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Add Task</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      </div>
    </>
  );
};

export default CrmPage;
