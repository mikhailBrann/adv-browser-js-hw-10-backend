import FileWorker from "./FileWorker.js";
import Server from "./Server.js";
const port = process.env.PORT || 8787;

export default class Blog {
    constructor() {
        this.file = new FileWorker('posts.json', true, '{"posts":[]}');
        this.server = new Server();

        //rout init
        this.server.setGetRouter('/posts', this.getPosts.bind(this));
        this.server.setPostRouter('/sendPost', this.addTextPost.bind(this));
        this.server.app.listen(port, async () => {
            console.log(`Server started on port ${port}`);
        });
    }

    async getPosts(req, res) {
        try {
            const postsRequest = await this.file.readFile();
            const { posts } = JSON.parse(postsRequest);

            return res.send({'status': 'true', 'posts': posts});
        } catch (error) {
            return res.send({'status': 'false', 'message': error.message});
        }
        
    }

    async addTextPost(req, res) {
        try {
            if(!req.body.textPost) {
                return res.send({'status': 'false', 'message': 'Укажите текст поста'});
            }

            const { textPost } = req.body;
            const postsRequest = await this.file.readFile();
            const postsObj = JSON.parse(postsRequest);
            
            postsObj.posts.push(textPost);

            await this.file.writeFile(JSON.stringify(postsObj));

            return res.send({'status': 'true', textPost});      
        } catch (error) {
            return res.send({'status': 'false', 'message': error.message});
        }
    }
    
}