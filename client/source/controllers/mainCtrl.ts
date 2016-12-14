export default class mainCtrl {

    static $inject = [
        "$http"
    ];

    constructor(
        private $http: angular.IHttpService,
    ) {
        this.main();
    }

    private main(): void {

    }

    private buckets: any;

    public getAllBuckets() {
        console.log('Loading buckets...');
        this.$http.get('http://127.0.0.1:3000/bucket/all').then(
            (data) => {
                console.log(data);
                this.buckets = data;
            }
        ).catch((error) => {
            console.log(error);
        });

    }

    private bucketName: string;

    public addBucket() {
        console.log('Adding bucket...', this.bucketName);
        this.$http.put('http://127.0.0.1:3000/bucket', { "bucketName": this.bucketName }).then(
            (data) => {
                console.log(data.data.message);
            }
        ).catch((error) => {
            console.log(error);
        });
    }
}