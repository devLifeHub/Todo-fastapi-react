export const navbarLinks = [
  { name: 'About Me', to: '#about' },
  { name: 'Work', to: '#work' },
  { name: 'Price', to: '#price' },
  { name: 'Reviews', to: '#reviews' },
];

export const pricesData = {
    prices: {
        pricesTitle: "Price List",
        pricesDescr: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab rem maiores saepe, similique quaerat est eos sapiente labore, deleniti quas quis itaque eaque dignissimos fugiat esse iure, atque ad et. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quis, cumque quasi adipisci quaerat ea repudiandae nihil non totam esse, culpa, magni veniam voluptates reiciendis laborum voluptatum accusamus beatae perspiciatis!",
    },
    BASIC: { 
      title: "Basic", 
      descr: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero? " 
    },
    PREMIUM: { 
      title: "Premium", 
      descr: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero?" 
    },
    VIP: { 
      title: "VIP", 
      descr: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero?" 
    },
  };

export const paymentData = {
  basic: {
    descr: {
      descrItem1: "You can save up to 8 tasks" ,
      descrItem2: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero?" ,
      descrItem3: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero?" ,
      descrItem4: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero?" ,
      descrItem5: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero?" ,
      descrItem6: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero?" ,
      descrItem7: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat accusamus molestiae exercitationem saepe sit ad nihil nesciunt repellendus vitae? Optio neque consectetur libero?" ,
    },
  },
  premium: {
    descr: {
      descrItem1: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat" ,
      descrItem2: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat" ,
      descrItem3: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat" ,
      descrItem4: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat" ,
      descrItem5: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat" ,
      descrItem6: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat" ,
      descrItem7: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse molestias, voluptatibus pariatur, ut ab cumque fugiat" ,
    },
  },
  vip: {
    descr: {
      descrItem1: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." ,
      descrItem2: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." ,
      descrItem3: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." ,
      descrItem4: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." ,
      descrItem5: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." ,
      descrItem6: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." ,
      descrItem7: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." ,
    },
  },
}

export const aboutData = {
  title: "About Me",
  advantage: {
    title: "Our users use the app to:",
    items: [
      {key: "1", descr: "Planning work projects"},
      {key: "2", descr: "Organizing the educational process"},
      {key: "3", descr: "Creating personal to-do lists"},
      {key: "4", descr: "Monitoring goals and habits"},
    ]
  }
}

export const heroData = {
  title: `Organize your
to-dos in one app`,
  subtitle: "This is the main content of the Home page.",
}

export const workData = {
  title: "Work",
}

// Auth

export const loginFieldParameters = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    autoComplete: 'current-password',
  },
];

export const registerFieldParameters = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    autoComplete: 'name',
  },
  {
    name: 'surname',
    type: 'text',
    placeholder: 'Surname',
    autoComplete: 'surname',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    autoComplete: 'current-password',
  },
];


export const authRegisterData = {
    title: "Don't have an account?",
    text: "Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.",
    btn: "Register",
    type: "register",
  };

export  const authLoginData = {
    title: "Have an account?",
    text: "Already registered? Log into your account now.",
    btn: "Login",
    type: "login",
  };

export const  profileFieldParameters = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    autoComplete: 'name',
  },
  {
    name: 'surname',
    type: 'text',
    placeholder: 'Surname',
    autoComplete: 'surname',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    autoComplete: 'email',
  },
  {
    name: 'new_password',
    type: 'text',
    placeholder: 'Password',
    autoComplete: 'current-password',
  },
];
