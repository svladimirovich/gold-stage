import { StageEvent } from "../../../models/events";
import { generateGuid } from "../../../helpers/guid";
import { EventFormAction, EventFormActions } from "./event-form.actions";

export interface EventFormState {
    state: "loading" | "idle" | "saving";
    stageEvent: StageEvent;
    addPictureUrl: string;
    errorCode: number;
    errorMessage: string;    
}

const initialState: EventFormState = {
    state: "idle",
    stageEvent: {
        id: generateGuid(),
        title: "",
        date: new Date(),
        shortDescription: "",
        fullDescription: "",
        location: "",
        bannerBackground: "https://goo.gl/1pfWdk",
        eventType: "ballet",
        maxTicketPrice: 0,
        minTicketPrice: 0,
        pictures: [],
        soldOut: false,
    },
    addPictureUrl: "",
    errorCode: null,
    errorMessage: null,
}

export function eventFormReducer(state = initialState, action: EventFormAction): EventFormState {
    const stageEvent = copyStageEvent(state.stageEvent);
    switch(action.type) {
        case EventFormActions.FormLoaded:
            return {
                ...state,
                stageEvent: action.stageEvent,
            }
        case EventFormActions.FormSaved:
            return {
                ...state,
                stageEvent: action.stageEvent,
                errorCode: action.errorCode,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

function copyStageEvent(stageEvent): StageEvent {
    return {
        ...stageEvent,
        pictures: [...(stageEvent.pictures)]
    }
}

