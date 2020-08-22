import axios from "axios";

export default {
    methods: {
        load(objectStructure, uid) {
            console.log("Calling mixin!");
            axios({
                method: "get",
                url: `${this.$config.maximo.url}/maximo/oslc/os/${objectStructure}/${uid}`,
                params: {
                    _lid: this.$config.maximo.username,
                    _lpwd: this.$config.maximo.password,
                    lean: 1,
                },
            })
                .then((response) => {
                    this.updateCurrentAsset(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        loadSet(objectStructure, pagenum, perPage, select) {
            axios({
                method: "get",
                url: `${this.$config.maximo.url}/maximo/oslc/os/mxasset`,
                params: {
                    _lid: this.$config.maximo.username,
                    _lpwd: this.$config.maximo.password,
                    pageno: pagenum,
                    lean: 1,
                    "oslc.pageSize": perPage,
                    "oslc.select": select,
                },
            })
                .then((response) => {
                    this.updateCurrentPage(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        save(objectStructure, uid) {
            axios({
                method: "post",
                url: `${this.$config.maximo.url}/maximo/oslc/os/mxasset/${uid}`,
                headers: {
                    "x-method-override": "PATCH",
                    properties: "*",
                },
                params: {
                    _lid: this.$config.maximo.username,
                    _lpwd: this.$config.maximo.password,
                    lean: 1,
                },
                data: this.asset,
            })
                .then((response) => {
                    if (response.status == "200") {
                        this.updateCurrentAsset(response.data);
                        alert("Updated successfully!");
                    } else {
                        alert("Oops... something went wrong!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}