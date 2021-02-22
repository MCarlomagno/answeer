import { enviroment } from "../enviroment/enviroment";

export class WikipediaService {

    static async testFetch() {
        const response = await fetch(this.prefillUrl(enviroment.wikipediaTestUrl));
        const body = await response.json();
        console.log(body)
    }

    static prefillUrl (url: string): string {
        return "https://powerful-lowlands-31269.herokuapp.com/" + url;
    }

}