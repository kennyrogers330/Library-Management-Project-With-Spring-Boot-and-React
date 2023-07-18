class MessageModel {
    title: string;
    question: string;
    id?: number;
    userEmail?: string;
    admin_email?: string;
    response?: string;
    closed?: boolean;

    constructor(title: string, question: string){
        this.title = title;
        this.question = question;
    }
}

export default MessageModel;