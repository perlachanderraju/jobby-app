import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AboutJobItem from './components/AboutJobItem'
import AllJobs from './components/AllJobs'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobs} />
    <ProtectedRoute exact path="/jobs/:id" component={AboutJobItem} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

// import './App.css'

// import {Switch, Route, Redirect, withRouter, Link} from 'react-router-dom'

// import Loader from 'react-loader-spinner'

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// // import { CiLocationOn } from "react-icons/ci";
// import Cookies from 'js-cookie'

// import {BsBriefcase} from 'react-icons/bs'

// import {FaSearch} from 'react-icons/fa'

// import {Component} from 'react'

// import Header from './Components/Header'

// import NotFound from './Components/NotFound'

// import FilterGroup from './Components/FilterGroup'

// import JobItemDetails from './Components/JobItemDetails'

// // import { FaStar } from "react-icons/fa6";

// // These are the lists used in the application. You can move them to any component needed.
// const employmentTypesList = [
//   {
//     label: 'Full Time',
//     employmentTypeId: 'FULLTIME',
//   },
//   {
//     label: 'Part Time',
//     employmentTypeId: 'PARTTIME',
//   },
//   {
//     label: 'Freelance',
//     employmentTypeId: 'FREELANCE',
//   },
//   {
//     label: 'Internship',
//     employmentTypeId: 'INTERNSHIP',
//   },
// ]

// const salaryRangesList = [
//   {
//     salaryRangeId: '1000000',
//     label: '10 LPA and above',
//   },
//   {
//     salaryRangeId: '2000000',
//     label: '20 LPA and above',
//   },
//   {
//     salaryRangeId: '3000000',
//     label: '30 LPA and above',
//   },
//   {
//     salaryRangeId: '4000000',
//     label: '40 LPA and above',
//   },
// ]

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }
// const apiStatusConstantst = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// // Replace your code here

// class Jobs extends Component {
//   state = {
//     profiledata: {},
//     jobdetails: [],
//     profileApiStatus: apiStatusConstantst.initial,
//     jobsApiStatus: apiStatusConstants.initial,
//     searchInput: '',
//     activeSalaryRangeId: '',
//     employmentTypesChecked: [],
//   }
//   componentDidMount() {
//     this.getProfiledetails()
//     this.getjobdetails()
//   }
//   updateEmploymentTypesChecked = typeId => {
//     const {employmentTypesChecked} = this.state
//     let updatedList = employmentTypesChecked
//     if (employmentTypesChecked.includes(typeId)) {
//       updatedList = employmentTypesChecked.filter(
//         eachType => eachType !== typeId,
//       )
//     } else {
//       updatedList = [...updatedList, typeId]
//     }

//     this.setState({employmentTypesChecked: updatedList}, this.getjobdetails)
//   }

//   updateSalaryRangeId = activeSalaryRangeId => {
//     this.setState({activeSalaryRangeId}, this.getjobdetails)
//   }

//   getjobdetails = async () => {
//     this.setState({jobsApiStatus: apiStatusConstants.inProgress})
//     const {activeSalaryRangeId, employmentTypesChecked, searchInput} =
//       this.state
//     const employTypes = employmentTypesChecked.join(',')
//     const purl = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
//     const jwtToken = Cookies.get('jwt_token')
//     const poptins = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     const response = await fetch(purl, poptins)
//     if (response.ok === true) {
//       const fetcheddata = await response.json()
//       console.log(fetcheddata)
//       const updatedjobdetails = fetcheddata.jobs.map(each => ({
//         companyLogoUrl: each.company_logo_url,
//         employmentType: each.employment_type,
//         id: each.id,
//         jobDescription: each.job_description,
//         location: each.location,
//         packagePerAannum: each.package_per_annum,
//         rating: each.rating,
//         title: each.title,
//       }))
//       this.setState({
//         jobdetails: updatedjobdetails,
//         jobsApiStatus: apiStatusConstants.success,
//       })
//     } else {
//       this.setState({jobsApiStatus: apiStatusConstants.failure})
//     }
//   }

//   getProfiledetails = async () => {
//     this.setState({profileApiStatus: apiStatusConstantst.inProgress})
//     const purl = 'https://apis.ccbp.in/profile'
//     const jwtToken = Cookies.get('jwt_token')
//     const poptins = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     const response = await fetch(purl, poptins)
//     if (response.ok === true) {
//       const fetcheddata = await response.json()

//       const updatedprofiledata = {
//         name: fetcheddata.profile_details.name,
//         profileImageUrl: fetcheddata.profile_details.profile_image_url,
//         shortBio: fetcheddata.profile_details.short_bio,
//       }
//       this.setState({
//         profiledata: updatedprofiledata,
//         profileApiStatus: apiStatusConstantst.success,
//       })
//     } else {
//       this.setState({profileApiStatus: apiStatusConstantst.failure})
//     }
//   }

//   renderJobsLoaderView = () => (
//     <div className='jobs-loader-container' data-testid='loader'>
//       <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
//     </div>
//   )
//   renderNoJobsView = () => (
//     <div className='nojob-container'>
//       <img
//         src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
//         alt='no jobs'
//         className='nojobs'
//       />
//       <h1>No Jobs Found</h1>
//       <p>We could not find any jobs.Try other filters.</p>
//     </div>
//   )

//   renderJobsList = () => {
//     const {jobdetails} = this.state
//     const {id} = jobdetails
//     return (
//       <>
//         {jobdetails.length > 0 ? (
//           <ul className='j-container'>
//             {jobdetails.map(each => (
//               <li className='jobli'>
//                 <Link to={`/jobs/${each.id}`}>
//                   <div className='lijob'>
//                     <img
//                       src={each.companyLogoUrl}
//                       className='profileicon'
//                       alt='company logo'
//                     />
//                     <div>
//                       <h1>{each.title}</h1>
//                       <div className='lijob'>
//                         <p>{each.rating}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className='lijob'>
//                     <div className='lijob'>
//                       <p>{each.location}</p>
//                     </div>
//                     <div className='lijob'>
//                       <BsBriefcase />
//                       <p>{each.employmentType}</p>
//                       <p>{each.packagePerAannum}</p>
//                     </div>
//                   </div>
//                   <hr className='hr' />
//                   <h1>Description</h1>
//                   <p>{each.jobDescription}</p>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           this.renderNoJobsView()
//         )}
//       </>
//     )
//   }
//   renderJobsApiFailureView = () => (
//     <div className='jobs-api-failure-container'>
//       <img
//         src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
//         alt='failure view'
//         className='job-api-failure-image'
//       />
//       <h1 className='failure-view-heading'>Oops! Something Went Wrong</h1>
//       <p className='failure-view-description'>
//         We cannot seem to find the page you are looking for
//       </p>
//       <button
//         type='button'
//         className='retry-button'
//         onClick={() => this.getjobdetails()}
//       >
//         Retry
//       </button>
//     </div>
//   )

//   renderJobsBasedOnAPiStatus = () => {
//     const {jobsApiStatus} = this.state

//     switch (jobsApiStatus) {
//       case apiStatusConstants.inProgress:
//         return this.renderJobsLoaderView()
//       case apiStatusConstants.success:
//         return this.renderJobsList()
//       case apiStatusConstants.failure:
//         return this.renderJobsApiFailureView()
//       default:
//         return null
//     }
//   }

//   renderProfileLoader = () => (
//     <div className='loader-container-profile' data-testid='loader'>
//       <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
//     </div>
//   )
//   renderProfile = () => {
//     const {profiledata} = this.state
//     return (
//       <div className='job2'>
//         <div className='profile'>
//           <img
//             src={profiledata.profileImageUrl}
//             className='profileicon'
//             alt='profile'
//           />
//           <h1 className='ph'>{profiledata.name}</h1>
//           <p className='ph'>{profiledata.shortBio}</p>
//         </div>
//       </div>
//     )
//   }
//   renderProfileFailure = () => {
//     ;<div className='nonprofile'>
//       <button type='button' onClick={() => this.getProfiledetails()}>
//         Retry
//       </button>
//     </div>
//   }

//   renderProfieBasedOnAPiStatus = () => {
//     const {profileApiStatus} = this.state

//     switch (profileApiStatus) {
//       case apiStatusConstantst.inProgress:
//         return this.renderProfileLoader()
//       case apiStatusConstantst.success:
//         return this.renderProfile()
//       case apiStatusConstantst.failure:
//         return this.renderProfileFailure()
//       default:
//         return null
//     }
//   }
//   render() {
//     const {searchInput, activeSalaryRangeId, employmentTypesChecked} =
//       this.state
//     return (
//       <>
//         <Header />
//         <div className='job-container'>
//           <div className='job1'>
//             {this.renderProfieBasedOnAPiStatus()}
//             <hr className='hr' />
//             <FilterGroup
//               updateSalaryRangeId={this.updateSalaryRangeId}
//               activeSalaryRangeId={activeSalaryRangeId}
//               updateEmploymentTypesChecked={this.updateEmploymentTypesChecked}
//               employmentTypesChecked={employmentTypesChecked}
//             />
//           </div>
//           <div className='job5'>
//             <div className='search-container'>
//               <input
//                 placeholder='Search'
//                 className='inputelement'
//                 type='search'
//                 value={searchInput}
//                 onChange={e => this.setState({searchInput: e.target.value})}
//               />
//               <button
//                 type='button'
//                 data-testid='searchButton'
//                 onClick={() => this.getjobdetails()}
//               >
//                 <FaSearch className='icon' />
//               </button>
//             </div>
//             {this.renderJobsBasedOnAPiStatus()}
//           </div>
//         </div>
//       </>
//     )
//   }
// }

// const ProtectedRoute = props => {
//   const jwtToken = Cookies.get('jwt_token')
//   if (jwtToken === undefined) {
//     ;<Redirect to='/login' />
//   }
//   return <Route {...props} />
// }

// const Home = () => {
//   return (
//     <div className='home-container'>
//       <Header />
//       <div className='bottom-container'>
//         <h1 className='h'>Find The Job That Fits Your Life</h1>
//         <p className='h'>
//           Millions of people are searching for jobs,salary information,company
//           reviews.Find the job that fits your abilities and potential
//         </p>
//         <Link to='/jobs'>
//           <button type='button'>Find Jobs</button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// class Login extends Component {
//   state = {
//     username: '',
//     password: '',
//     showSubmitError: false,
//     errorMsg: '',
//   }
//   onSubmitSuccess = jwtToken => {
//     Cookies.set('jwt_token', jwtToken, {expires: 30})
//     const {history} = this.props
//     history.replace('/')
//   }
//   onSubmitFailure = errorMsg => {
//     this.setState({showSubmitError: true, errorMsg})
//   }
//   submitForm = async event => {
//     event.preventDefault()
//     const {username, password} = this.state
//     const userdetails = {username, password}
//     const url = 'https://apis.ccbp.in/login'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userdetails),
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     console.log(data)
//     if (response.ok === true) {
//       this.onSubmitSuccess(data.jwt_token)
//     } else {
//       this.onSubmitFailure(data.error_msg)
//     }
//   }

//   changeusername = event => {
//     this.setState({username: event.target.value})
//   }

//   changepassword = event => {
//     this.setState({password: event.target.value})
//   }

//   render() {
//     const {username, password, showSubmitError, errorMsg} = this.state
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       ;<Redirect to='/' />
//     }
//     return (
//       <div className='login-container'>
//         <form className='form-container' onSubmit={this.submitForm}>
//           <div className='logo-container'>
//             <img
//               src='https://assets.ccbp.in/frontend/react-js/logo-img.png '
//               alt='website logo'
//               className='websitelogo'
//             />
//           </div>
//           <label htmlFor='username' className='username-label'>
//             USERNAME
//           </label>
//           <input
//             placeholder='Username'
//             value={username}
//             type='text'
//             id='username'
//             className='username-input'
//             onChange={this.changeusername}
//           />
//           <label htmlFor='password' className='username-label'>
//             PASSWORD
//           </label>
//           <input
//             placeholder='Password'
//             value={password}
//             type='password'
//             id='password'
//             className='username-input'
//             onChange={this.changepassword}
//           />
//           <button type='submit' className='btn'>
//             Login
//           </button>
//           {showSubmitError && <p>*{errorMsg}</p>}
//         </form>
//       </div>
//     )
//   }
// }

// const App = () => (
//   <>
//     <Switch>
//       <Route exact path='/login' component={Login} />
//       <ProtectedRoute exact path='/' component={Home} />
//       <ProtectedRoute exact path='/jobs' component={Jobs} />
//       <ProtectedRoute exact path='/jobs/:id' component={JobItemDetails} />
//       <Route exact path='/not-found' component={NotFound} />
//       <Redirect to='/not-found' />
//     </Switch>
//   </>
// )

// export default App
