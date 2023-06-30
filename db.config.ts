import AWS from 'aws-sdk'

AWS.config.update({
    region: "eu-central-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const db = new AWS.DynamoDB.DocumentClient()

const Table = 'books'

export {
    db,
    Table
}