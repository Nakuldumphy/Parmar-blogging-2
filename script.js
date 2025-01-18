const tag_plate  = ['d.png','d (1).png','unnamed.png'];
let background = ['#BC382E','#4583AA','#388D80'];
let bear_img = ['./undraw_refreshing-beverage_w8al.svg','./undraw_refreshing-beverage_w8al (2).svg','./undraw_refreshing-beverage_w8al (1).svg'];
let ordinary_day = ['./undraw_ordinary-day_ak4e (1).svg','./undraw_ordinary-day_ak4e.svg','undraw_ordinary-day_ak4e (3).svg'];
let i = 0;
let only_once = 0;
function heroBackground() {
    if(i==3) i=0;
    let parent = document.querySelector('.hero_background');
    let hero = document.querySelector('.hero');
    let bear = document.querySelector('#bear');
    bear.setAttribute('src', `${bear_img[i]}`);
    let element = document.createElement('img');
    element.setAttribute('src', `./${tag_plate[i]}`);
    element.setAttribute('id', 'tag_plate');
    hero.style.backgroundColor = background[i];
    if(only_once )
    document.querySelector('.your_blog').style.backgroundImage = `url('${ordinary_day[i]}')`;
    i++;
    parent.appendChild(element);
    setInterval(() => {
        element.remove();
    }, 2900);
}

setInterval(heroBackground, 3000);

const observer = new IntersectionObserver ((entries) => {
    entries.forEach((entry) => {
        // console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
    });
}); 
 const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

//Initial Settings
const initializer = () => {
  //function calls for highlighting buttons
  //No highlights for link, unlink,lists, undo,redo since they are one time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //default size
  fontSizeRef.value = 3;
};

//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

//link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        //If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();
let flag = 1;

let num_of_posts =0;
// Your Blog Posts:
const publish = document.getElementById('publish');
publish.addEventListener('click',()=>{
  num_of_posts++;
  document.getElementById('no_post').classList.add('rem');
  let blogContent = document.getElementById('text-input');
  // console.log(blogContent.textContent);

  // create blog
  let article = document.createElement('article');
  article.classList.add('my_blog');
  article.classList.add(`${flag}`);
  

  let h1 = document.createElement('H1');
  h1.textContent = document.getElementById('write_title').value;
  h1.setAttribute('id',`title_read${flag}`);


  let date = document.createElement('div');
  date.classList.add('date');
  date.textContent = (new Date()).toDateString();
  
  let content = document.createElement('div');
  content.classList.add('my_blog_content');
  content.innerHTML = blogContent.innerHTML;
  content.setAttribute('id',`content_read${flag}`);
  
  let blogOption = document.createElement('div');
  blogOption.classList.add('my_blog_options');

  let button = document.createElement('button');
  button.textContent = 'Delete';
  button.setAttribute('id',`${flag}`);
  

  let read = document.createElement('a');
  read.textContent = 'Read more';
  read.setAttribute('href',`#read_here`);
  read.setAttribute('id',`read${flag}`);
  flag++;

  blogOption.appendChild(button);
  blogOption.appendChild(read);

  article.appendChild(h1);
  article.appendChild(date);
  article.appendChild(content);
  article.appendChild(blogOption);

  const posts = document.getElementById('blog_posts');
  posts.appendChild(article);
})


const posts = document.getElementById('blog_posts');
posts.addEventListener('click',(event)=>{
    // console.log(event.target.id);
    if(event.target.textContent == 'Delete'){
      let del = document.getElementsByClassName(event.target.id);
    Array.from(del).forEach(element =>{
      element.remove();
    })
    num_of_posts--;
    if(num_of_posts==0)
    document.getElementById('no_post').classList.remove('rem');
    }
    if(event.target.textContent == 'Read more'){
       if(only_once == 0){
        let section = document.getElementById('read_here');
       section.classList.add('read_here');
       section.style.height = '70vh';
       section.style.width = '100vw';
       let yourBlog = document.createElement('div');
       yourBlog.classList.add('your_blog');
       let title = document.createElement('h1');
       title.setAttribute('id','your_title');
       yourBlog.appendChild(title);
       let content = document.createElement('div');
       content.setAttribute('id','your_content');
       yourBlog.appendChild(content);
       section.appendChild(yourBlog);
       title.textContent = document.getElementById(`title_${event.target.id}`).textContent;
       content.innerHTML = document.getElementById(`content_${event.target.id}`).innerHTML;
       only_once = 1;
       }
       else{
        let title = document.getElementById('your_title');
        title.textContent = document.getElementById(`title_${event.target.id}`).textContent;
        let content = document.getElementById('your_content');
        content.innerHTML = document.getElementById(`content_${event.target.id}`).innerHTML;
       }
       
    }
})

let flag2 = 100;
document.getElementById('note_button').addEventListener('click',()=>{
  let noteContent = document.getElementById('note_description');
  // console.log(blogContent.textContent);

  // create Note
  let article = document.createElement('article');
  article.classList.add('my_note');
  article.classList.add(`${flag2}`);
  

  let h1 = document.createElement('H1');
  h1.textContent = document.getElementById('note_topic').value;


  let date = document.createElement('div');
  date.classList.add('date');
  date.textContent = (new Date()).toDateString();
  
  let content = document.createElement('div');
  content.classList.add('my_blog_content');
  content.textContent = noteContent.value;
  
  let blogOption = document.createElement('div');
  blogOption.classList.add('my_blog_options');

  let button = document.createElement('button');
  button.textContent = 'Delete';
  button.setAttribute('id',`${flag2}`);
  flag2++;


  blogOption.appendChild(button);
  // blogOption.appendChild(read);

  article.appendChild(h1);
  article.appendChild(date);
  article.appendChild(content);
  article.appendChild(blogOption);

  const notes = document.getElementById('show_notes');
  notes.appendChild(article);
});

const notes = document.getElementById('show_notes');
notes.addEventListener('click',(event)=>{
    // console.log(event.target.id);
    let del = document.getElementsByClassName(event.target.id);
    Array.from(del).forEach(element =>{
      element.remove();
    })
});


