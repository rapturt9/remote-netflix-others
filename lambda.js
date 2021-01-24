const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
 
exports.handler = (event, context, callback) => {
    console.log("EventType: "+event);
    console.log("Context: "+JSON.stringify(context));
    dynamodb.putItem({
        TableName: "lambda-dynamodb-stream-netflix",
        Item: {
            "id": {
                S: JSON.stringify(context)
            },
            "event": {
                S: event.toString()
            }
        }
    }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(null, {
                statusCode: '500',
                body: err
            });
        } else {
            callback(null, {
                statusCode: '200',
                body: 'Hello ' + JSON.stringify(context) + ", "+event+ '!'
            });
        }
    });
}
    
