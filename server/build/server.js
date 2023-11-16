/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/runpod.ts":
/*!***********************!*\
  !*** ./api/runpod.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.retrieveJob = exports.generateImage = void 0;\nconst axios_1 = __importDefault(__webpack_require__(/*! axios */ \"axios\"));\nconst config_1 = __importDefault(__webpack_require__(/*! ../config/config */ \"./config/config.ts\"));\nconst generateImage = (prompt, width, height) => __awaiter(void 0, void 0, void 0, function* () {\n    const options = {\n        method: \"POST\",\n        url: \"https://api.runpod.ai/v2/stable-diffusion-v1/run\",\n        headers: {\n            accept: \"application/json\",\n            \"content-type\": \"application/json\",\n            authorization: config_1.default.runpod.apikey,\n        },\n        data: {\n            input: {\n                prompt,\n                width,\n                height,\n                guidance_scale: 7.5,\n                num_inference_steps: 50,\n                num_outputs: 1,\n                prompt_strength: 1,\n                scheduler: \"KLMS\",\n            },\n        },\n    };\n    return axios_1.default\n        .request(options)\n        .then(function (response) {\n        console.log(response.data);\n        return response.data;\n    })\n        .catch(function (error) {\n        console.error(error);\n        return { id: \"\", status: \"error\" };\n    });\n});\nexports.generateImage = generateImage;\nconst retrieveJob = (job_id) => __awaiter(void 0, void 0, void 0, function* () {\n    const options = {\n        method: \"POST\",\n        url: `https://api.runpod.ai/v2/stable-diffusion-v1/status/${job_id}`,\n        headers: {\n            accept: \"application/json\",\n            authorization: config_1.default.runpod.apikey,\n        },\n    };\n    return axios_1.default\n        .request(options)\n        .then(function (response) {\n        console.log(response.data);\n        return response.data;\n    })\n        .catch(function (error) {\n        console.error(error);\n        return {\n            id: \"\",\n            status: \"error\",\n        };\n    });\n});\nexports.retrieveJob = retrieveJob;\n\n\n//# sourceURL=webpack:///./api/runpod.ts?");

/***/ }),

/***/ "./config/config.dev.ts":
/*!******************************!*\
  !*** ./config/config.dev.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst devConfig = {\n    db: {\n        uri: process.env.MONGO_URI ||\n            \"mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true\",\n        options: {\n            user: process.env.MONGO_USERNAME || \"\",\n            pass: process.env.MONGO_USERNAME || \"\",\n            dbName: \"dev\",\n            keepAlive: true,\n            useNewUrlParser: true,\n            useUnifiedTopology: true,\n            useCreateIndex: true,\n        },\n    },\n    jwt: {\n        secret: \"jwtSecret\",\n        expiration: 360000,\n    },\n    runpod: {\n        apikey: process.env.RUNPOD_API_KEY || \"\",\n    },\n};\nexports.default = devConfig;\n\n\n//# sourceURL=webpack:///./config/config.dev.ts?");

/***/ }),

/***/ "./config/config.prod.ts":
/*!*******************************!*\
  !*** ./config/config.prod.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst prodConfig = {\n    db: {\n        uri: process.env.MONGO_URI || \"<mongodb uri here>\",\n        options: {\n            user: process.env.MONGO_USERNAME || \"\",\n            pass: process.env.MONGO_USERNAME || \"\",\n            dbName: \"prod\",\n            keepAlive: true,\n            useNewUrlParser: true,\n            useUnifiedTopology: true,\n            useCreateIndex: true,\n        },\n    },\n    jwt: {\n        secret: \"jwtSecret\",\n        expiration: 360000,\n    },\n    runpod: {\n        apikey: process.env.RUNPOD_API_KEY || \"\",\n    },\n};\nexports.default = prodConfig;\n\n\n//# sourceURL=webpack:///./config/config.prod.ts?");

/***/ }),

/***/ "./config/config.ts":
/*!**************************!*\
  !*** ./config/config.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_dev_1 = __importDefault(__webpack_require__(/*! ./config.dev */ \"./config/config.dev.ts\"));\nconst config_prod_1 = __importDefault(__webpack_require__(/*! ./config.prod */ \"./config/config.prod.ts\"));\nconst selectedConfiguration =  false ? undefined : config_dev_1.default;\nexports.default = selectedConfiguration;\n\n\n//# sourceURL=webpack:///./config/config.ts?");

/***/ }),

/***/ "./core/auth/strategies/local.ts":
/*!***************************************!*\
  !*** ./core/auth/strategies/local.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst passport_1 = __importDefault(__webpack_require__(/*! passport */ \"passport\"));\nconst passport_local_1 = __importDefault(__webpack_require__(/*! passport-local */ \"passport-local\"));\nconst user_1 = __importDefault(__webpack_require__(/*! ../../../models/user */ \"./models/user.ts\"));\nconst LocalStrategy = passport_local_1.default.Strategy;\npassport_1.default.use(new LocalStrategy({ usernameField: \"username\" }, (username, password, done) => {\n    user_1.default.findOne({ username: username.toLowerCase() }, (err, user) => {\n        if (err) {\n            return done(err);\n        }\n        if (!user) {\n            return done(undefined, false, {\n                message: `username ${username} not found.`,\n            });\n        }\n        user.comparePassword(password, (err, isMatch) => {\n            if (err) {\n                return done(err);\n            }\n            if (isMatch) {\n                return done(undefined, user);\n            }\n            return done(undefined, false, {\n                message: \"Invalid username or password.\",\n            });\n        });\n    });\n}));\n\n\n//# sourceURL=webpack:///./core/auth/strategies/local.ts?");

/***/ }),

/***/ "./core/init.ts":
/*!**********************!*\
  !*** ./core/init.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.initAuth = exports.initMongoose = exports.initMiddleware = void 0;\nconst body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst passport_1 = __importDefault(__webpack_require__(/*! passport */ \"passport\"));\nconst config_1 = __importDefault(__webpack_require__(/*! ../config/config */ \"./config/config.ts\"));\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./utils.ts\");\nconst initMiddleware = (app) => {\n    app.use((0, cors_1.default)());\n    app.use(body_parser_1.default.json());\n    app.use(body_parser_1.default.urlencoded({ extended: false }));\n};\nexports.initMiddleware = initMiddleware;\nconst initMongoose = () => {\n    mongoose_1.default.connect(config_1.default.db.uri, config_1.default.db.options, (err) => {\n        if (err) {\n            console.log(\"could not connect to mongodb\");\n        }\n        mongoose_1.default.set(\"debug\", !utils_1.isProduction);\n    });\n};\nexports.initMongoose = initMongoose;\nconst initAuth = (app) => {\n    app.use(passport_1.default.initialize());\n};\nexports.initAuth = initAuth;\n\n\n//# sourceURL=webpack:///./core/init.ts?");

/***/ }),

/***/ "./models/image.ts":
/*!*************************!*\
  !*** ./models/image.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst imageSchema = new mongoose_1.Schema({\n    jobId: {\n        type: String,\n        required: true,\n        unique: true,\n    },\n    prompt: {\n        type: String,\n        required: true,\n    },\n    isPending: {\n        type: Boolean,\n        default: true,\n    },\n    dateCreated: {\n        type: Date,\n        default: Date.now,\n    },\n    url: {\n        type: String,\n    },\n});\nconst Image = (0, mongoose_1.model)(\"Image\", imageSchema);\nexports.default = Image;\n\n\n//# sourceURL=webpack:///./models/image.ts?");

/***/ }),

/***/ "./models/user.ts":
/*!************************!*\
  !*** ./models/user.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ \"bcryptjs\"));\nconst userSchema = new mongoose_1.Schema({\n    username: {\n        type: String,\n        required: true,\n        unique: true,\n    },\n    password: {\n        type: String,\n        required: true,\n    },\n    date: {\n        type: Date,\n        default: Date.now,\n    },\n});\nuserSchema.pre(\"save\", function save(next) {\n    const user = this;\n    bcryptjs_1.default.genSalt(10, (err, salt) => {\n        if (err) {\n            return next(err);\n        }\n        bcryptjs_1.default.hash(this.password, salt, (err, hash) => {\n            if (err) {\n                return next(err);\n            }\n            user.password = hash;\n            next();\n        });\n    });\n});\nuserSchema.methods.comparePassword = function (candidatePassword, callback) {\n    bcryptjs_1.default.compare(candidatePassword, \n    // @ts-ignore: Property does not exist on type\n    this.password, (err, isMatch) => {\n        callback(err, isMatch);\n    });\n};\nconst User = (0, mongoose_1.model)(\"User\", userSchema);\nexports.default = User;\n\n\n//# sourceURL=webpack:///./models/user.ts?");

/***/ }),

/***/ "./routes/auth.ts":
/*!************************!*\
  !*** ./routes/auth.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst http_status_codes_1 = __importDefault(__webpack_require__(/*! http-status-codes */ \"http-status-codes\"));\nconst passport_1 = __importDefault(__webpack_require__(/*! passport */ \"passport\"));\n__webpack_require__(/*! ../core/auth/strategies/local */ \"./core/auth/strategies/local.ts\");\nconst jwt = __importStar(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst config_1 = __importDefault(__webpack_require__(/*! ../config/config */ \"./config/config.ts\"));\nconst router = (0, express_1.Router)();\n// @route   POST api/auth/local\n// @desc    Login with local user\n// @access  Public\nrouter.post(\"/local\", [\n    (0, express_validator_1.check)(\"username\", \"Username is required\").exists(),\n    (0, express_validator_1.check)(\"password\", \"Password is required\").exists(),\n], (req, res, next) => {\n    const errors = (0, express_validator_1.validationResult)(req);\n    if (!errors.isEmpty()) {\n        return res\n            .status(http_status_codes_1.default.BAD_REQUEST)\n            .json({ errors: errors.array() });\n    }\n    passport_1.default.authenticate(\"local\", (err, user, info) => {\n        if (!user || err) {\n            return res.status(http_status_codes_1.default.UNAUTHORIZED).send();\n        }\n        const token = jwt.sign({ username: user.username }, config_1.default.jwt.secret);\n        return res.status(http_status_codes_1.default.OK).send({ token: token });\n    })(req, res, next);\n});\nexports.default = router;\n\n\n//# sourceURL=webpack:///./routes/auth.ts?");

/***/ }),

/***/ "./routes/images.ts":
/*!**************************!*\
  !*** ./routes/images.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst http_status_codes_1 = __importDefault(__webpack_require__(/*! http-status-codes */ \"http-status-codes\"));\n__webpack_require__(/*! ../core/auth/strategies/local */ \"./core/auth/strategies/local.ts\");\nconst runpod_1 = __webpack_require__(/*! ../api/runpod */ \"./api/runpod.ts\");\nconst image_1 = __importDefault(__webpack_require__(/*! ../models/image */ \"./models/image.ts\"));\nconst router = (0, express_1.Router)();\nrouter.post(\"/generate\", [\n    (0, express_validator_1.check)(\"prompt\", \"Prompt is required\").exists(),\n    (0, express_validator_1.check)(\"width\", \"Width is required\").exists(),\n    (0, express_validator_1.check)(\"height\", \"Height is required\").exists(),\n], (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const errors = (0, express_validator_1.validationResult)(req);\n    if (!errors.isEmpty()) {\n        return res\n            .status(http_status_codes_1.default.BAD_REQUEST)\n            .json({ errors: errors.array() });\n    }\n    try {\n        const generateResponse = yield (0, runpod_1.generateImage)(req.body.prompt, req.body.width, req.body.height);\n        if (generateResponse.id) {\n            const new_image = yield image_1.default.create({\n                jobId: generateResponse.id,\n                prompt: req.body.prompt,\n            });\n            console.log(new_image);\n            return res.status(http_status_codes_1.default.OK).send({ id: new_image.jobId });\n        }\n    }\n    catch (err) {\n        console.log(err);\n        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send();\n    }\n}));\nrouter.get(\"/all\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const errors = (0, express_validator_1.validationResult)(req);\n    if (!errors.isEmpty()) {\n        return res\n            .status(http_status_codes_1.default.BAD_REQUEST)\n            .json({ errors: errors.array() });\n    }\n    try {\n        const images = yield image_1.default.find({});\n        images.sort((a, b) => {\n            return b.dateCreated.getTime() - a.dateCreated.getTime();\n        });\n        return res.status(http_status_codes_1.default.OK).send(images);\n    }\n    catch (err) {\n        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send();\n    }\n}));\nrouter.get(\"/updatePending\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const errors = (0, express_validator_1.validationResult)(req);\n    if (!errors.isEmpty()) {\n        return res\n            .status(http_status_codes_1.default.BAD_REQUEST)\n            .json({ errors: errors.array() });\n    }\n    try {\n        const pending = yield image_1.default.find({ isPending: true });\n        const promises = [];\n        const updatedImages = [];\n        if (pending.length > 0) {\n            for (const image of pending) {\n                promises.push(checkJobStatus(image.jobId).then((image) => {\n                    if (image) {\n                        updatedImages.push(image);\n                    }\n                }));\n            }\n        }\n        yield Promise.all(promises);\n        return res.status(http_status_codes_1.default.OK).send({\n            remaining: pending.length - updatedImages.length,\n            updated: updatedImages,\n        });\n    }\n    catch (err) {\n        console.log(err);\n        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send();\n    }\n}));\nconst checkJobStatus = (jobId) => __awaiter(void 0, void 0, void 0, function* () {\n    return (0, runpod_1.retrieveJob)(jobId).then((response) => {\n        if (response.status === \"COMPLETED\" &&\n            response.output &&\n            response.output.length > 0) {\n            const image = image_1.default.findOneAndUpdate({ jobId }, {\n                isPending: false,\n                url: response.output[0].image,\n            }, {\n                new: true,\n            });\n            console.log(image);\n            return image;\n        }\n        else {\n            return null;\n        }\n    });\n});\nexports.default = router;\n\n\n//# sourceURL=webpack:///./routes/images.ts?");

/***/ }),

/***/ "./routes/user.ts":
/*!************************!*\
  !*** ./routes/user.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst http_status_codes_1 = __importDefault(__webpack_require__(/*! http-status-codes */ \"http-status-codes\"));\n__webpack_require__(/*! ../core/auth/strategies/local */ \"./core/auth/strategies/local.ts\");\nconst user_1 = __importDefault(__webpack_require__(/*! ../models/user */ \"./models/user.ts\"));\nconst jwt = __importStar(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst config_1 = __importDefault(__webpack_require__(/*! ../config/config */ \"./config/config.ts\"));\nconst router = (0, express_1.Router)();\n// @route   POST api/user/register\n// @desc    Register new user\n// @access  Public\nrouter.post(\"/register\", [\n    (0, express_validator_1.check)(\"username\", \"Username is required\").exists(),\n    (0, express_validator_1.check)(\"password\", \"Password is required\").exists(),\n], (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const errors = (0, express_validator_1.validationResult)(req);\n    if (!errors.isEmpty()) {\n        return res\n            .status(http_status_codes_1.default.BAD_REQUEST)\n            .json({ errors: errors.array() });\n    }\n    try {\n        yield user_1.default.create({\n            username: req.body.username,\n            password: req.body.password,\n        });\n        const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, config_1.default.jwt.secret);\n        return res.status(http_status_codes_1.default.OK).send({ token: token });\n    }\n    catch (err) {\n        console.log(err);\n        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send();\n    }\n}));\nexports.default = router;\n\n\n//# sourceURL=webpack:///./routes/user.ts?");

/***/ }),

/***/ "./server.ts":
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst init_1 = __webpack_require__(/*! ./core/init */ \"./core/init.ts\");\nconst auth_1 = __importDefault(__webpack_require__(/*! ./routes/auth */ \"./routes/auth.ts\"));\nconst user_1 = __importDefault(__webpack_require__(/*! ./routes/user */ \"./routes/user.ts\"));\nconst images_1 = __importDefault(__webpack_require__(/*! ./routes/images */ \"./routes/images.ts\"));\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst app = (0, express_1.default)();\nconst PORT = 8000;\n(0, init_1.initMongoose)();\n(0, init_1.initMiddleware)(app);\n(0, init_1.initAuth)(app);\napp.get(\"/\", (_req, res) => {\n    res.send({\n        message: \"API running\",\n    });\n});\napp.use(\"/api/auth\", auth_1.default);\napp.use(\"/api/user\", user_1.default);\napp.use(\"/api/images\", images_1.default);\napp.listen(PORT, () => {\n    console.log(\"server started at http://localhost:\" + PORT);\n});\n\n\n//# sourceURL=webpack:///./server.ts?");

/***/ }),

/***/ "./utils.ts":
/*!******************!*\
  !*** ./utils.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.isProduction = void 0;\nexports.isProduction = \"development\" === 'production';\n\n\n//# sourceURL=webpack:///./utils.ts?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv/config\");\n\n//# sourceURL=webpack:///external_%22dotenv/config%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validator\");\n\n//# sourceURL=webpack:///external_%22express-validator%22?");

/***/ }),

/***/ "http-status-codes":
/*!************************************!*\
  !*** external "http-status-codes" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-status-codes\");\n\n//# sourceURL=webpack:///external_%22http-status-codes%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ })

/******/ });