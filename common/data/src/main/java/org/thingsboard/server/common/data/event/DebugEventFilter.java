/**
 * Copyright © 2016-2024 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.thingsboard.server.common.data.event;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.thingsboard.server.common.data.StringUtils;

@Data
@Schema
public abstract class DebugEventFilter implements EventFilter {

    @Schema(description = "String value representing the server name, identifier or ip address where the platform is running", example = "ip-172-31-24-152")
    protected String server;
    @Schema(description = "Boolean value to filter the errors", allowableValues = {"false", "true"})
    protected boolean isError;
    @Schema(description = "The case insensitive 'contains' filter based on error message", example = "not present in the DB")
    protected String errorStr;

    public void setIsError(boolean isError) {
        this.isError = isError;
    }

    @Override
    public boolean isNotEmpty() {
        return !StringUtils.isEmpty(server) || isError || !StringUtils.isEmpty(errorStr);
    }

}
