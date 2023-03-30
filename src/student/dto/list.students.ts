export class AgeFilter{
    age?:WhenAgeFilter=WhenAgeFilter.All;
}
export enum WhenAgeFilter{
    All=1,
    Teenager=18,
    Adult=20
}