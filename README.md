# bike-shedding
Create a simple bike sharing data dashboard

# Introduction
Hi, thanks for your interest in our Front End Engineering position. As part of the interview process we'd like you to build a simple dashboard with Indego bike sharing data.

# Steps
1. Fork this repo to your personal GitHub profile
2. Clone this repo to your computer
3. Visit [Indego's ride sharing data](https://www.rideindego.com/about/data/) site and download one of the datasets
4. Use front end web technologies to build a chart and answer a question about the data
5. Add to the bottom of this README file details what needs to be done to view your project locally
6. Make a pull request for us to review your code

### Your project should
1. Load data via an asynchronous request in a web browser using javascript
2. Display a visual chart displaying the data or an aggregation of the data
3. Display some or all of the raw data in a table
4. Have 2 or more ways you can interact with the data (ie. hover, click, etc.)
5. Be viewable in the latest versions of Chrome and Firefox
6. Display a question about the data that your chart tries to answer

### You should
1. Use any javascript libraries or frameworks you want
2. Write some or all of your own html/css

### It's not required, but your project can
1. Use other languages that compile to javascript (Typescript, Coffeescript, Clojurescript, etc.)
2. Use other languages that compile to css (LESS, Sass, etc.)

### We will evaluate the project based on the following criteria
1. Meeting the project requirements listed above
2. Code quality
3. Style and creativity

Feel free to reach out to us for clarifications.

Thanks and good luck!

### How to run this project locally
You must have Ruby, Rails, Bundler, and npm installed.

Clone the repo and bundle:
```
git clone https://github.com/wrayjs/bike-shedding.git
cd bike-shedding
```

```
bundle install
cd client
npm install // or yarn install if you prefer
cd ..
```

The seed files must be copied from another repo, because [Github does currently not support large files in public forks](https://help.github.com/articles/collaboration-with-git-large-file-storage/).

```
cd ..
git clone https://github.com/wrayjs/bike-shedding-seeds.git
```

Move both csv's into `bike-shedding`.

```
bundle exec rake db:create db:migrate db:seed
```

This will take a while.

```
gem install foreman
foreman start
```

Your browser should open with the project.
