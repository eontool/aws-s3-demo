"use strict";
class mainCtrl {
    constructor($http) {
        this.$http = $http;
        this.main();
    }
    main() {
    }
    getAllBuckets() {
        console.log('Loading buckets...');
        this.$http.get('http://127.0.0.1:3000/bucket/all').then((data) => {
            console.log(data);
            this.buckets = data;
        }).catch((error) => {
            console.log(error);
        });
    }
    addBucket() {
        console.log('Adding bucket...', this.bucketName);
        this.$http.put('http://127.0.0.1:3000/bucket', { "bucketName": this.bucketName }).then((data) => {
            console.log(data.data.message);
        }).catch((error) => {
            console.log(error);
        });
    }
}
mainCtrl.$inject = [
    "$http"
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mainCtrl;
