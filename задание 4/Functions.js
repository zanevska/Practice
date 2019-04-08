class PostList{
    constructor(arrOfPosts){
        this._arrOfPosts = arrOfPosts;
    }

    _SortByStringlength(post) {
        post.sort(function (a, b) {
            if (a.description.length - b.description.length < 0) {
                return 1;
            }
            else {
                return -1;
            }
        });
    }
    getPosts(skip = 0, top = 10, config) {
        var result = this._arrOfPosts.slice();//copying my array (arrOfPosts)
        var flag = false;
        this._SortByStringlength(result);
        if(config.author){
            result = result.filter(function (post) {//create new massive with only correct elements
                return post.author.toLowerCase() === config.author.toLowerCase();
            });
        }
        result = result.slice(skip, skip+top);//copying part between skip and skip+top
        return result;
    }

    getPostById(id) {
        var t = false;
        for(var i = 0; i < arrOfPosts.length; i++ ){
            if(arrOfPosts[i].id === id){
                t = true;
                return arrOfPosts[i];
            }
        }
        if(!t){
            console.log("There is no such id.");
            return t;
        }
    }

    _validatePost(post) {
        if (!post.id || !post.author || !post.ImgLink || !post.description) {
            console.log("There is no such post.");
            return false;
        }
        if ((post.author.length >= 100) || post.author.length === 0) {
            console.log("Wrong post username length.");
            return false;
        }
        if(post.ImgLink.length === 0){
            console.log("There is no photo.");
            return false;
        }
        if (post.description.length >= 200 ) {
            console.log("Wrong post:" + post.id + " description length: " + post.description.length +">=200");
            return false;
        }
        return true;
    }

    AddPost(post) {
        if (this._validatePost(post)) {
            arrOfPosts.push(post);
            return true;
        }
        else return false;
    }

    editPost(postID, post) {
        var copy = Object.assign({},this.getPostById(postID));//copying all the fields of post with this id
        if (post.id) {
            copy.id = post.id;
        }
        if (post.author) {
            copy.author = post.author;
        }
        if (post.ImgLink) {
            copy.ImgLink = post.ImgLink;
        }
        if (post.description) {
            copy.description = post.description;
        }
        if (this._validatePost(copy)) {
            for (var i = 0; i < arrOfPosts.length; i++) {
                if (arrOfPosts[i].id === postID) {
                    arrOfPosts[i] = copy;
                    return true;
                }
            }
        }
        else
            return false;
    }

    removePost(id) {
        var tmp = 0;
        for (var i = 0; i < arrOfPosts.length; i++) {
            if (arrOfPosts[i].id === id) {
                tmp = i;
                break;
            }
        }
        if(tmp === 0){
            console.log("There is no post with such id.");
            return false;
        }
        arrOfPosts.splice(tmp, 1);//delete one post from the position tmp
        return true;
    }






    addAll(arrOfPosts){
        this._arrOfPosts = [];
        for(var i =0; i < arrOfPosts.length; i++){
            if(this._validatePost(arrOfPosts[i])){
                this._arrOfPosts.push(arrOfPosts[i]);
            }
        }
        return this._arrOfPosts;
    }
}

const Posts = new PostList(arrOfPosts);
console.log(Posts.getPosts(10, 6, "Иванов Иван"));
console.log(Posts.getPostById("7"));
console.log(Posts.getPostById("7"));
console.log(Posts.removePost("8"));
console.log(Posts.getPosts(0,7,{
    author: "lawyer",
}));
console.log(Posts.AddPost(
    {
        id: "666",
        description: "Some description.",
        author: "Harmonious_whale",
        ImgLink: "https://35photo.ru/photos_col/r2/85/426195_500r.jpg",
    }
));
console.log(Posts);
Posts.editPost("10",{description: "Another description."});