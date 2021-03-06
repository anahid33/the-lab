/*

articles

submit
-  validation
-  data binding
- confirmation page
- submission
- block next on not valid
- file uploads
- show completed sections


Admin
- login
- see submitted
- see images
- change status

Emails
- submit confirm email (admin, submitter, contact)
- picked up email (submitter, contact)
- arrived email (submitter, contact)
- processing complete (submitter, contact)
*/

var form = new Vue({
    el: '#formapp',
    data: {
        pickDetails: {
            customerName: null,
            transactionNumber: null,
            projectName: null,
            contactName: null,
            contactPhone: null,
            contactEmail: null
        },
        equipmentQuanitities: {},
        shippingInfo: {},
        bulkDetails: {},
        uploads: [],

        selectedPage: 1,
        showMenu: false
    },
    computed: {
        continueText: function () {
            return this.selectedPage < 6 ? "Continue" : "Submit";

        },
        titleText: function () {
            switch (this.selectedPage) {
                case 1:
                    return "Pickup Details";
                case 2:
                    return "Equipment Quanitities";
                case 3:
                    return "Shipping Information";
                case 4:
                    return "Bulk Pickup Details";
                case 5:
                    return "Uploads";

            }
            return "Summary";
        }

    },

    methods: {
        toggleMenu: function () {
            this.showMenu = !this.showMenu;
        },
        selectPage: function (id) {
            this.selectedPage = id;
            this.showMenu = false;
        },
        nextPage: function () {
            if (this.selectedPage < 6) {
                this.selectPage(this.selectedPage + 1)
            }
        },
        pageHidden: function (id) {
            return !this.pageSelected(id);
        },
        pageSelected: function (id) {
            return this.selectedPage === id
        }

    }
})
