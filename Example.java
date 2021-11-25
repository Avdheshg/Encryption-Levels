public class Example {

    public static void main(String[] args) {
        // int arr[] = new int[]{10, 20, 40, 60, 5, 8};        // 5, 6, 7, 8, 9, 10, 1, 2, 3
        int arr[] = new int[]{2, 4, 8, 9, 11, 12, 20};
        int low = 0, high = arr.length;
        int mid = 2;

        System.out.println(mergeOfMS(arr,low, mid, high));
    }

    public static boolean mergeOfMS(int arr[], int low, int mid, int high) {
        int len = arr.length;

        // define the 1st array
        int a[] = new int[mid+1];
        // for (int i = 0; i < )

        return false;

    }

    // public static boolean findReqSum(int arr[], int low, int high, int reqSum) {

    //     while (low < high) {
    //         int currSum = arr[low] + arr[high];

    //         if (currSum == reqSum) {
    //             return true;
    //         } else if (currSum > reqSum) {
    //             high--;
    //         } else {
    //             low++;
    //         }
    //     }

    //     return false;
    // }

























    

}