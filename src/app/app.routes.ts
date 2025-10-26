import {Routes} from '@angular/router';
import {Task1Component} from './tasks/task1/task1.component';
import {Task2Component} from './tasks/task2/task2.component';
import {Task22Component} from './tasks/task2/task22.component';
import {Task3Component} from './tasks/task3/task3.component';

export const routes: Routes = [
  {
    path: "task1",
    component: Task1Component,
    data: {
      title: "Create a generic filter bar",
      description: `<h6>Introduction</h6>
      <p>
        At QPLIX we work on increasingly large and complex data sets. Very often
        we have the use case that we present this data to the user in tabular
        form. One example is security or asset data which an investor may be
        invested in. In addition to investment types such as shares and bonds,
        there are many other asset classes, which can also include countless
        securities.
      </p>
      <h6>Goal</h6>
      <p>
        Your task is to build a generic filter bar which supports all filter inputs that are needed to compose the <kbd>SecuritiesFilter</kbd> interface.
      </p>
      <p>
        Find a way to make the filter bar easily extensible, e.g. when the <kbd>SecuritiesFilter</kbd> interface changes in the future.
      </p>
      <h6>Task</h6>
      <ul>
        <li>
          The filter bar returns a filter object which can be used for server-side filtering. The filter bar
          does not filter the table on the client side itself.
        </li>
        <li>
          It should also be possible to use the filter bar in other
          components and for other pages with different filter interfaces. It should therefore have
          <b>no direct dependencies</b> to either the
          <kbd>FilterableTableComponent</kbd> or the
          <kbd>SecuritiesFilter</kbd> interface.
        </li>
        <li>
          The filter bar should be able to serve the entire
          <kbd>SecuritiesFilter</kbd> interface.
          <pre>
          <code>
          export interface SecuritiesFilter extends PagingFilter {
            name?: string;
            types?: string[];
            currencies?: string[];
            isPrivate?: boolean;
          }
          </code>
          </pre>
        </li>
        <li>
          Changing the filter should lead to the table being filtered via the <kbd>SecurityService.getSecurities(filter)</kbd> backend call.
        </li>
        <li>
          Also consider a solution for paging the table. We have provided the
          <kbd>PagingFilter</kbd> interface for this.
        </li>
      </ul>
      <p>
        Feel free to use additional libraries if you think that they will make
        your work easier and contribute to the solution.
      </p>`
    }
  },
  {
    path: "task2",
    component: Task2Component,
    data: {
      title: "Improve selection performance",
      description: `
      <h6>Introduction</h6>
      <p>
        When working on larger datasets in the frontend there might be times where performance issues arise.
        While this example isn't particularly realistic in itself it show-cases a performance problem that did arise in our
        software a while ago in a different scenario.
      </p>
      <h6>Goal</h6>
      <p>
        Find out why the "Select all" and "Deselect all" button feels laggy and fix the problem while keeping the same functionality and data size.
      </p>
      <h6>Task</h6>
      <ul>
        <li>
        Clicking the "Select all" and "Deselect all" should feel instant.
        </li>
        <li>
        The checkbox states should stay the same after clicking "Recreate data".
        </li>
        <li>
        Since this might be a tricky one: If you don't find a solution try to bring us some of the insights you gathered and how you approached this challenge. :)
        </li>
      </ul>
      `
    }
  },
  {
    path: "task22",
    component: Task22Component,
    data: {
      title: "Improve selection performance (Alternative)",
      description: `
      <h6>Introduction</h6>
      <p>
        This is an alternative implementation of Task 2 that demonstrates how to solve the selection performance problem using Angular Material's built-in SelectionModel from @angular/cdk/collections.
      </p>
      `
    }
  },
  {
    path: "task3",
    component: Task3Component,
    data: {
      title: "Create a collectible asset dashboard",
      description: `      <h6>Introduction</h6>
      <p>
        At QPLIX we often want to present asset-specific information in a
        suitable format. Especially for our end-user-related products, we create
        visually appealing detail pages that are specifically tailored to the
        asset class.
      </p>
      <h6>Goal</h6>
      <p>
        The objective is to design and build a single-page dashboard for a
        high-value collectible asset, such as a vintage car or a rare painting.
      </p>
      <h6>Task</h6>
      <p>
        Choose one specific asset and then create a dashboard that tells its
        story through data and design. The dashboard should be divided into
        several key sections, each focusing on a different aspect of the asset.
        You have full creative freedom on the layout, but the following sections
        must be included:
      </p>
      <ul>
        <li>
          <strong>Header</strong>: A clean, professional header that includes
          the asset's name (e.g., "1964 Aston Martin DB5"), a high-quality image
          or carousel of the asset, and a clear, prominent current estimated
          value.
        </li>
        <li>
          <strong>Asset Details</strong>: A section that provides key, static
          information about the asset. This should be visually scannable and may
          include: Acquisition Date & Cost, Serial Number / VIN, Provenance /
          History (e.g., "owned by a famous celebrity," "displayed at a renowned
          museum"), Condition Report (e.g., "Pristine," "Restored")
        </li>
        <li>
          <strong>Performance Analytics</strong>: This is the core of the
          dashboard and where data visualization skills will be on full display.
          This section should use charts and graphs to illustrate the asset's
          value over time.
        </li>
        <li>
          <strong>Transaction History</strong>: A clean, easy-to-read table or
          list of recent sales or appraisals of similar assets. This section
          adds context to the performance data and should include columns like
          Date, Sale Price, and Location.
        </li>
      </ul>
      <p>
        For this task, you do not need to implement any interaction or other
        functionality; focus on providing an appealing and intuitive UI. Please
        use test data that is easy to create; we do not place any importance on
        accuracy for this task.
      </p> `
    }
  }
];
