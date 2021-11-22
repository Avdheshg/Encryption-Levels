public class Example {

    public static void main(String[] args) {
        int arr[] = new int[]{1,1,1,1,1,1,1};
        int num = 1;

        System.out.println(occurence(arr, num));
    }

    public static int occurence(int arr[], int num) {
        
        int first = -1, last = Integer.MAX_VALUE;

        // for (int i = 0; i < arr.length; i++) {
        //     // Check if equal
        //         // update the first
        //         // else update the last
        //     if (arr[i] == num) {
        //         if (first == -1) {
        //             first = i;
        //         } else {
        //             last = i;
        //         }
        //     }
        // }
        int len = arr.length;
        int low = 0, high = len-1;

        while (low <= high) {
            int mid = (low+high) / 2;

            if (arr[mid] > num) {
                high = mid-1;
            } else if (arr[mid] < num) {
                low = mid + 1;
            } else {
                if (first == -1) {
                    first = mid;
                } else {
                    last = mid;
                }
            }
        }

        return (last-first)+1;
    }
}