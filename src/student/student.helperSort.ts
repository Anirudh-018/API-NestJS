import { Student } from "src/typeorm/entities/Students";
//this is the code for sorting by weigthed score
export function mergeSortScore(list:Student []):Student [] {
    if (list.length <= 1) return list;
    let mid = Math.floor(list.length / 2);
    let left:Student [] = mergeSortScore(list.slice(0, mid));
    let right:Student [] = mergeSortScore(list.slice(mid));
    return mergeScore(left, right);
}

function mergeScore(list1:Student[], list2:Student[]):Student [] {   
    let merged:Student [] = [],
        i:number= 0,
        j:number = 0;
    while (i < list1.length && j < list2.length) {  
        if ((0.7*list1[i].gpa+0.3*list1[i].attendance) <(0.7*list2[j].gpa+0.3*list2[j].attendance)) {
            merged.push(list2[j]);
            j++;
        } 
        else {
            if ((0.7*list1[i].gpa+0.3*list1[i].attendance) ==(0.7*list2[j].gpa+0.3*list2[j].attendance)) {
                if(list1[i].name<list2[j].name){
                    merged.push(list1[i]);
                    i++;
                }
                else{
                    merged.push(list2[j]);
                    j++;
                }
            }
            else{
                merged.push(list2[j]);
                j++;
            }
        }
    }
    while (i < list1.length) {
        merged.push(list1[i]);
        i++;
    }
    while (j < list2.length) {
        merged.push(list2[j]);
        j++;
    }
    return merged;
}

//this is the code for sorting by registration date
export function mergeSortRegId(list:Student []):Student [] {
    if (list.length <= 1) return list;
    let mid = Math.floor(list.length / 2);
    let left:Student [] = mergeSortRegId(list.slice(0, mid));
    let right:Student [] = mergeSortRegId(list.slice(mid));
    return mergeId(left, right);
}

function mergeId(list1:Student[], list2:Student[]):Student [] {   
    let merged:Student [] = [],
        i:number= 0,
        j:number = 0;
    while (i < list1.length && j < list2.length) {  
        if (list1[i].registrationDate <list2[j].registrationDate) {
            merged.push(list1[i]);
            i++;
        } 
        else {
            merged.push(list2[j])
            j++;
        }
    }
    while (i < list1.length) {
        merged.push(list1[i]);
        i++;
    }
    while (j < list2.length) {
        merged.push(list2[j]);
        j++;
    }
    return merged;
}
