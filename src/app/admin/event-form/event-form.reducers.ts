import { StageEvent } from "../../../models/events";
import { generateGuid } from "../../../helpers/guid";
import { EventFormAction, EventFormActions } from "./event-form.actions";

export interface EventFormState {
    state: "loading" | "idle" | "saving";
    isEditMode: boolean;
    stageEvent: StageEvent;
    addPictureUrl: string;
    errorCode: number;
    errorMessage: string;    
}

const initialState: EventFormState = {
    state: "idle",
    isEditMode: false,
    stageEvent: initializeStageEvent(),
    addPictureUrl: "",
    errorCode: null,
    errorMessage: null,
}

function initializeStageEvent(): StageEvent {
    return {
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
    }
}

export function eventFormReducer(state = initialState, action: EventFormAction): EventFormState {
    switch(action.type) {
        case EventFormActions.StageEventLoaded:
            return {
                ...state,
                stageEvent: (action.stageEvent) ? copyStageEvent(action.stageEvent) : initializeStageEvent(),
                isEditMode: (action.stageEvent) ? ((action.errorCode || action.errorMessage) ? state.isEditMode : true) : false,
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

