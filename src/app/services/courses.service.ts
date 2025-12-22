
/**
 * @Injectable decorator: Marks the class as a service that can be injected into other components
HttpClient: Used for making HTTP requests
HttpParams: Helps create query parameters for API calls
Observable: Handles asynchronous data streams
map operator: Transforms the response data
 */
import {Injectable} from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {map} from "rxjs/operators";
import {Lesson} from "../model/lesson";


@Injectable()
export class CoursesService {

    constructor(private http:HttpClient) {

    }

    /**
     * Retrieves a single course by its ID
     * Returns an Observable of a Course object
     * Makes a GET request to /api/courses/{courseId}

     * @param courseId The id of the course
     * @returns an Observable of a Course object
     */
    findCourseById(courseId: number): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`);
    }

    /**
     * Fetches all courses
     * Uses the map operator to extract the 'payload' from the response
     * Returns an Observable array of Course objects
     * @returns 
     */
    findAllCourses(): Observable<Course[]> {
        return this.http.get('/api/courses')
            .pipe(
                map(res => res['payload'])
            );
            /**
             * pipe() Method
                 Part of RxJS Observable chain
                 Allows you to chain multiple operators together
                 Used to transform, filter, or manipulate Observable streams
               map() Operator
                 Transforms each value emitted by an Observable
                 Creates a new Observable with transformed values
                 Works similarly to JavaScript's array .map() method
             */
    }

    /**
     * Retrieves all lessons for a specific course
    * Uses HttpParams to set query parameters:
    * courseId: Identifies the course
    * pageNumber: Set to 0
    * pageSize: Set to 1000 (retrieves all lessons)
    * Extracts 'payload' from the response
     * @param courseId 
     * @returns 
     */
    findAllCourseLessons(courseId:number): Observable<Lesson[]> {
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    /**
     * Find a page of lessons of a given size for a given course
     * 
     * Most flexible method for fetching lessons
     * Supports pagination and sorting
     * Default parameters:
     * sortOrder: Ascending
     * pageNumber: 0
     * pageSize: 3
     * sortColumn: 'seqNo'
     * Allows customization of lesson retrieval
     * Please note: Uses RxJS map operator to transform responses
     * 
     * 
     * @param courseId The courseId
     * @param sortOrder How should we sort data?
     * @param pageNumber The page number
     * @param pageSize The size of the page
     * @param sortColumn Sort data based on a particular column
     * @returns 
     */
    findLessons(
        courseId:number, sortOrder = 'asc',
        pageNumber = 0, pageSize = 3, sortColumn = 'seqNo'):  Observable<Lesson[]> {

        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
                .set('sortColumn', sortColumn)
        }).pipe(
            map(res =>  res["payload"])
        );
    }

}
