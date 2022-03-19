export default function errorHandler (err, req, res, next) {
    console.log("There was an error");
    console.log("The error is", err);

    res.sendStatus(500);  
}