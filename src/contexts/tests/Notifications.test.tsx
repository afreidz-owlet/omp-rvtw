import NotificationContext, { useNotifications } from "../Notifications";
import { screen, renderHook, act, fireEvent } from "@testing-library/react";

const wrapper = ({ children }: { children: JSX.Element }) => (
  <NotificationContext>{children}</NotificationContext>
);

describe("Notifications Context", () => {
  it("should not have any notifications by default", () => {
    renderHook(() => useNotifications(), { wrapper });
    expect(screen.queryByTestId("current-notification")).toBeFalsy();
  });

  it("should render a single notification", () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });
    act(() => {
      result.current?.("test");
    });
    expect(screen.queryByTestId("current-notification")).toBeTruthy();
  });

  it("should render multiple notifications", () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });
    
    act(() => {
      result.current?.("test");
      result.current?.("test2");
    });
    
    expect(screen.queryByTestId("current-notification")).toBeTruthy();
    
    act(() => {
      fireEvent.click(screen.getByTestId("current-notification"));
    })

    expect(screen.queryByTestId("current-notification")).toBeTruthy();

    act(() => {
      fireEvent.click(screen.getByTestId("current-notification"));
    })

    expect(screen.queryByTestId("current-notification")).toBeFalsy();
  
  });
});
