const express = require('express');
const twit = require('twitter-api-sdk');
var cors = require('cors');
const { attachment } = require('express/lib/response');

const client = new twit.Client("AAAAAAAAAAAAAAAAAAAAAC2mcgEAAAAA71xIZ%2BvGM4KobH3Qion78cRz7qk%3DLijwTSsZA3DlyhSdkFM3U6l6XoIWImus8g16HlrYTbOZUL33dz");

const app = express();

app.use(cors())

// this function gets author of tweet based on tweet ID.
app.get('/api/tweet/:id', (req, res) => {
    client.tweets.findTweetById(req.params["id"], { expansions: ["author_id", "attachments.media_keys"], "media.fields": ["variants", "url", "preview_image_url", "type", "alt_text", "duration_ms", "height", "width"] }).then(
        tweet => {
            res.send(tweet);
        }
    );
});

app.get('/api/tweet/search/:keyword', (req, res) => {
    client.tweets.tweetsRecentSearch({ query: req.params["keyword"], max_results: 20 }).then(
        result => {
            res.send(result);
        }
    );
});

// app.get('/api/tweet/search/:keyword', (req, res) => {
//     client.tweets.tweetsFullarchiveSearch({ query: req.params["keyword"] }).then(
//         result => {
//             res.send(result);
//         }
//     );
// });

app.listen(3000, () => console.log('Server running'));