import { Student } from "src/typeorm/entities/Students";
//this is the code for sorting by weigthed score
//the mergeSort is a recursive function and runs with time complexity of O(nlogn)
//input to it is a student class array
export function mergeSortScore(list: Student[]): Student[] {
    if (list.length <= 1) return list;
    //the array is split by the midpoint of the array
    let mid = Math.floor(list.length / 2);
    //slice is used to split the array by indeces
    let left: Student[] = mergeSortScore(list.slice(0, mid));
    let right: Student[] = mergeSortScore(list.slice(mid));
    return mergeScore(left, right);
}

//the actual algorithm
function mergeScore(listLeft: Student[], listRight: Student[]): Student[] {
    let merged: Student[] = [],
        leftIndex: number = 0,
        rightIndex: number = 0;
    while (leftIndex < listLeft.length && rightIndex < listRight.length) {
        if ((0.7 * listLeft[leftIndex].gpa + 0.3 * listLeft[leftIndex].attendance) < (0.7 * listRight[rightIndex].gpa + 0.3 * listRight[rightIndex].attendance)) {
            merged.push(listRight[rightIndex]);
            rightIndex++;
        }
        else {
            if ((0.7 * listLeft[leftIndex].gpa + 0.3 * listLeft[leftIndex].attendance) == (0.7 * listRight[rightIndex].gpa + 0.3 * listRight[rightIndex].attendance)) {
                if (listLeft[leftIndex].name < listRight[rightIndex].name) {
                    merged.push(listLeft[leftIndex]);
                    leftIndex++;
                }
                else {
                    merged.push(listRight[rightIndex]);
                    rightIndex++;
                }
            }
            else {
                merged.push(listRight[rightIndex]);
                rightIndex++;
            }
        }
    }
    while (leftIndex < listLeft.length) {
        merged.push(listLeft[leftIndex]);
        leftIndex++;
    }
    while (rightIndex < listRight.length) {
        merged.push(listRight[rightIndex]);
        rightIndex++;
    }
    return merged;
}

//this is the code for sorting by registration date
//input to it is a student class array
//it is the same procedure as above
export function mergeSortRegId(list: Student[]): Student[] {
    if (list.length <= 1) return list;
    let mid = Math.floor(list.length / 2);
    let left: Student[] = mergeSortRegId(list.slice(0, mid));
    let right: Student[] = mergeSortRegId(list.slice(mid));
    return mergeId(left, right);
}

function mergeId(listLeft: Student[], listRight: Student[]): Student[] {
    let merged: Student[] = [],
        leftIndex: number = 0,
        rightIndex: number = 0;
    while (leftIndex < listLeft.length && rightIndex < listRight.length) {
        if (listLeft[leftIndex].registrationDate < listRight[rightIndex].registrationDate) {
            merged.push(listLeft[leftIndex]);
            leftIndex++;
        }
        else {
            merged.push(listRight[rightIndex])
            rightIndex++;
        }
    }
    while (leftIndex < listLeft.length) {
        merged.push(listLeft[leftIndex]);
        leftIndex++;
    }
    while (rightIndex < listRight.length) {
        merged.push(listRight[rightIndex]);
        rightIndex++;
    }
    return merged;
}
