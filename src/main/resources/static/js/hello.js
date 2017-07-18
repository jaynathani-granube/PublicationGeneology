angular.module('hello', [])
    .controller('home', function ($scope, AppService) {

        //$scope.greeting = {id: 'xxx', content: 'Hello World!'}

        $scope.pageTitle = "Search by Author or Paper title/keyword";
        $scope.infoTableAuthor = false;
        $scope.infoTablePaper = false;

        console.log($scope.result);

        $scope.searchPublication = function() {

            var selection = $scope.result;

            if(selection === 'author') {

                var authorName = $scope.authorName;

                AppService.searchAuthor(authorName)
                    .then(function (response) {
                       console.log(response.data);

                        $scope.authors = response.data;
                        $scope.predicate = 'author';
                    });
            }

            if(selection === 'paper') {

                var paperName = $scope.paperName;
                console.log(paperName);

                AppService.searchPaper(paperName)
                    .then(function (response) {
                        console.log(response.data);

                        $scope.papers = response.data;
                        $scope.predicate = 'paper';
                    });
            }
        };
        
        $scope.getAuthorInfo = function (author) {
            $scope.loading = true;

            $scope.selectedAuthorPapers = [];
            $scope.infoTablePaper = false;
            $scope.infoTableAuthor = false;
            console.log("LENGTH : " +$scope.selectedAuthorPapers.length);
            console.log(author);


            console.log("Now getting papers");

            //Get author papers and conference information
            AppService.searchPapersForAuthor(author.authorId)
                .then(function (response) {

                    console.log(response.data);
                    $scope.loading = false;
                    $scope.infoTableAuthor = true;
                    $scope.selectedAuthor = author;
                    $scope.selectedAuthorPapers = response.data
                });
        };

        $scope.getPaperInfo = function (paper) {

            console.log(paper);
            $scope.selectedPaper = paper;

            console.log("Now getting authors");

            // Get authors for paper
            AppService.searchAuthorsForPaper($scope.selectedPaper.title)
                .then(function (response) {
                    $scope.selectedPaperAuthors = response.data
                });

            $scope.infoTableAuthor = false;
            $scope.infoTablePaper = true;
        }
    });