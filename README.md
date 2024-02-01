### Assumtions made:

- "pt1" and "pt2" are in hours.

### Approach

- There are six total combination of routes Aman can take. We should calculate the time taken for each road/edge and store it in a 2D matrix.
- Whenever Aman needs to leave a restaurant, we should take the wait time into consideration.
- We should calculate the time taken for each path and return the path that takes minimum time.

### Approach for scaling

- Currently the paths are hardcoded, we can use a hashmap to keep record of the restaurants Aman has visited and the customers Aman can deliver to.
- Move functions to different modules.
- Use command line/source file to parse the inputs.